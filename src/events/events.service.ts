import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { EventParticipantEntity } from './entities/event-participant.entity';
import { EventDayPlanItemEntity } from './entities/event-day-plan-item.entity';
import { EventTreeBranchEntity } from './entities/event-tree-branch.entity';
import { EventTreeItemEntity } from './entities/event-tree-item.entity';
import { CreateEventDto, InviteParticipantDto, JoinPublicEventDto, UpdateEventDto } from './events.schemas';
import { UserEntity } from '../users/entities/user.entity';
import { NotificationEntity } from '../notifications/entities/notification.entity';
import { slugify } from '../common/utils/slug.util';
import { toEventResponse } from './events.mapper';

const LOCATION_SUGGESTIONS = [
  { city: 'Дніпро', country: 'Україна', address: 'Парк Шевченка', label: 'Дніпро, Україна · Парк Шевченка' },
  { city: 'Дніпро', country: 'Україна', address: 'Menorah Center', label: 'Дніпро, Україна · Menorah Center' },
  { city: 'Київ', country: 'Україна', address: 'UNIT.City', label: 'Київ, Україна · UNIT.City' },
  { city: 'Львів', country: 'Україна', address: '!FESTrepublic', label: 'Львів, Україна · !FESTrepublic' },
  { city: 'Одеса', country: 'Україна', address: 'Морський вокзал', label: 'Одеса, Україна · Морський вокзал' },
  { city: 'Харків', country: 'Україна', address: 'YermilovCentre', label: 'Харків, Україна · YermilovCentre' },
  { city: 'Донецьк', country: 'Україна', address: 'Center Plaza', label: 'Донецьк, Україна · Center Plaza' },
  { city: 'Варшава', country: 'Польща', address: 'PGE Narodowy', label: 'Варшава, Польща · PGE Narodowy' },
  { city: 'Краків', country: 'Польща', address: 'ICE Kraków', label: 'Краків, Польща · ICE Kraków' },
  { city: 'Berlin', country: 'Germany', address: 'Station Berlin', label: 'Berlin, Germany · Station Berlin' },
];

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>,
    @InjectRepository(EventParticipantEntity)
    private readonly participantsRepository: Repository<EventParticipantEntity>,
    @InjectRepository(EventDayPlanItemEntity)
    private readonly dayPlanRepository: Repository<EventDayPlanItemEntity>,
    @InjectRepository(EventTreeBranchEntity)
    private readonly treeBranchesRepository: Repository<EventTreeBranchEntity>,
    @InjectRepository(EventTreeItemEntity)
    private readonly treeItemsRepository: Repository<EventTreeItemEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(NotificationEntity)
    private readonly notificationsRepository: Repository<NotificationEntity>,
  ) {}

  async listMyEvents(userId: number) {
    const events = await this.eventsRepository.find({
      where: { owner: { id: userId } },
      relations: { participants: true, dayPlan: true, treeBranches: { items: true } },
      order: { startAt: 'ASC' },
    });

    return events.map(toEventResponse);
  }

  async listDiscover(filters: { query?: string; format?: string; visibility?: string }) {
    const qb = this.eventsRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.participants', 'participants')
      .leftJoinAndSelect('event.dayPlan', 'dayPlan')
      .leftJoinAndSelect('event.treeBranches', 'treeBranches')
      .leftJoinAndSelect('treeBranches.items', 'treeItems')
      .where('event.visibility = :visibility', { visibility: filters.visibility || 'public' })
      .orderBy('event.startAt', 'ASC');

    if (filters.query?.trim()) {
      qb.andWhere('(LOWER(event.name) LIKE :query OR LOWER(event.location) LIKE :query OR LOWER(event.description) LIKE :query)', {
        query: `%${filters.query.trim().toLowerCase()}%`,
      });
    }

    if (filters.format && ['offline', 'online', 'hybrid'].includes(filters.format)) {
      qb.andWhere('event.format = :format', { format: filters.format });
    }

    const events = await qb.getMany();
    return events.map(toEventResponse);
  }

  locationSuggestions(query: string) {
    const normalized = query.trim().toLowerCase();
    const filtered = normalized
      ? LOCATION_SUGGESTIONS.filter((item) => item.label.toLowerCase().includes(normalized) || item.city.toLowerCase().includes(normalized))
      : LOCATION_SUGGESTIONS;

    return filtered.slice(0, 8);
  }

  async getById(userId: number, eventId: number) {
    const event = await this.findOwnedEvent(userId, eventId);
    return toEventResponse(event);
  }

  async create(userId: number, dto: CreateEventDto) {
    const owner = await this.usersRepository.findOne({ where: { id: userId } });
    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    const slug = await this.makeUniqueSlug(dto.name);
    const event = this.eventsRepository.create({
      name: dto.name,
      startAt: new Date(dto.startAt),
      location: dto.location,
      city: dto.city ?? null,
      address: dto.address ?? null,
      description: dto.description,
      slug,
      publicLink: dto.publicLink || `https://eventcloud.app/e/${slug}`,
      status: dto.status,
      visibility: dto.visibility,
      format: dto.format,
      owner,
    });

    const saved = await this.eventsRepository.save(event);
    await this.replaceNestedCollections(saved, dto);
    return this.getById(userId, saved.id);
  }

  async update(userId: number, eventId: number, dto: UpdateEventDto) {
    const event = await this.findOwnedEvent(userId, eventId);

    if (dto.name !== undefined && dto.name !== event.name) {
      event.name = dto.name;
      const slug = await this.makeUniqueSlug(dto.name, event.id);
      event.slug = slug;
      event.publicLink = dto.publicLink || `https://eventcloud.app/e/${slug}`;
    }
    if (dto.startAt !== undefined) event.startAt = new Date(dto.startAt);
    if (dto.location !== undefined) event.location = dto.location;
    if (dto.city !== undefined) event.city = dto.city;
    if (dto.address !== undefined) event.address = dto.address;
    if (dto.description !== undefined) event.description = dto.description;
    if (dto.publicLink !== undefined) event.publicLink = dto.publicLink;
    if (dto.status !== undefined) event.status = dto.status;
    if (dto.visibility !== undefined) event.visibility = dto.visibility;
    if (dto.format !== undefined) event.format = dto.format;

    await this.eventsRepository.save(event);
    await this.replaceNestedCollections(event, dto);
    return this.getById(userId, event.id);
  }

  async remove(userId: number, eventId: number) {
    const event = await this.findOwnedEvent(userId, eventId);
    await this.eventsRepository.remove(event);
    return { success: true };
  }

  async inviteParticipant(userId: number, eventId: number, dto: InviteParticipantDto) {
    const event = await this.findOwnedEvent(userId, eventId);

    const participant = this.participantsRepository.create({
      event,
      email: dto.email,
      name: dto.name || dto.email,
      role: dto.role,
      state: 'pending',
    });

    await this.participantsRepository.save(participant);

    const invitedUser = await this.usersRepository.findOne({ where: { email: dto.email } });
    if (invitedUser) {
      const notification = this.notificationsRepository.create({
        user: invitedUser,
        type: 'invite',
        title: 'Collaboration invite',
        text: `You were invited to join event ${event.name}`,
        isRead: false,
      });
      await this.notificationsRepository.save(notification);
    }

    return this.getById(userId, eventId);
  }

  async joinPublicEvent(slug: string, dto: JoinPublicEventDto) {
    const event = await this.eventsRepository.findOne({
      where: { slug, visibility: 'public' },
      relations: { owner: true, participants: true, dayPlan: true, treeBranches: { items: true } },
    });

    if (!event) {
      throw new NotFoundException('Public event not found');
    }

    const existing = await this.participantsRepository.findOne({
      where: { event: { id: event.id }, email: dto.email },
    });

    if (!existing) {
      await this.participantsRepository.save(
        this.participantsRepository.create({
          event,
          email: dto.email,
          name: dto.name,
          role: dto.role,
          state: 'pending',
        }),
      );

      await this.notificationsRepository.save(
        this.notificationsRepository.create({
          user: event.owner,
          type: 'request',
          title: 'New participation request',
          text: `${dto.name} wants to join ${event.name}`,
          isRead: false,
        }),
      );
    }

    return { success: true };
  }

  async setParticipantState(userId: number, eventId: number, participantId: number, state: 'confirmed' | 'pending') {
    const event = await this.findOwnedEvent(userId, eventId);
    const participant = await this.participantsRepository.findOne({
      where: { id: participantId, event: { id: event.id } },
    });

    if (!participant) {
      throw new NotFoundException('Participant not found');
    }

    participant.state = state;
    await this.participantsRepository.save(participant);
    return this.getById(userId, eventId);
  }

  async publicEventBySlug(slug: string) {
    const event = await this.eventsRepository.findOne({
      where: { slug },
      relations: { participants: true, dayPlan: true, treeBranches: { items: true } },
    });

    if (!event) {
      throw new NotFoundException('Public event not found');
    }

    return toEventResponse(event);
  }

  private async findOwnedEvent(userId: number, eventId: number) {
    const event = await this.eventsRepository.findOne({
      where: { id: eventId },
      relations: { owner: true, participants: true, dayPlan: true, treeBranches: { items: true } },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }
    if (event.owner.id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return event;
  }

  private async makeUniqueSlug(name: string, excludeId?: number) {
    const base = slugify(name);
    let attempt = base;
    let index = 1;

    while (true) {
      const existing = await this.eventsRepository.findOne({ where: { slug: attempt } });
      if (!existing || existing.id === excludeId) return attempt;
      index += 1;
      attempt = `${base}-${index}`;
    }
  }

  private async replaceNestedCollections(event: EventEntity, dto: Partial<CreateEventDto>) {
    if (dto.dayPlan) {
      await this.dayPlanRepository.delete({ event: { id: event.id } as any });
      for (const item of dto.dayPlan) {
        await this.dayPlanRepository.save(this.dayPlanRepository.create({ ...item, event }));
      }
    }

    if (dto.team) {
      await this.participantsRepository.delete({ event: { id: event.id } as any });
      for (const member of dto.team) {
        await this.participantsRepository.save(this.participantsRepository.create({ ...member, event }));
      }
    }

    if (dto.tree) {
      const existingBranches = await this.treeBranchesRepository.find({
        where: { event: { id: event.id } },
        relations: { items: true },
      });

      for (const branch of existingBranches) {
        await this.treeBranchesRepository.remove(branch);
      }

      for (const branch of dto.tree) {
        const savedBranch = await this.treeBranchesRepository.save(
          this.treeBranchesRepository.create({
            title: branch.title,
            state: branch.state,
            event,
          }),
        );

        for (const item of branch.items) {
          await this.treeItemsRepository.save(this.treeItemsRepository.create({ value: item, branch: savedBranch }));
        }
      }
    }
  }
}
