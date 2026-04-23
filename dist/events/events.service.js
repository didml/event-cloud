"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./entities/event.entity");
const event_participant_entity_1 = require("./entities/event-participant.entity");
const event_day_plan_item_entity_1 = require("./entities/event-day-plan-item.entity");
const event_tree_branch_entity_1 = require("./entities/event-tree-branch.entity");
const event_tree_item_entity_1 = require("./entities/event-tree-item.entity");
const user_entity_1 = require("../users/entities/user.entity");
const notification_entity_1 = require("../notifications/entities/notification.entity");
const slug_util_1 = require("../common/utils/slug.util");
const events_mapper_1 = require("./events.mapper");
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
let EventsService = class EventsService {
    constructor(eventsRepository, participantsRepository, dayPlanRepository, treeBranchesRepository, treeItemsRepository, usersRepository, notificationsRepository) {
        this.eventsRepository = eventsRepository;
        this.participantsRepository = participantsRepository;
        this.dayPlanRepository = dayPlanRepository;
        this.treeBranchesRepository = treeBranchesRepository;
        this.treeItemsRepository = treeItemsRepository;
        this.usersRepository = usersRepository;
        this.notificationsRepository = notificationsRepository;
    }
    async listMyEvents(userId) {
        const events = await this.eventsRepository.find({
            where: { owner: { id: userId } },
            relations: { participants: true, dayPlan: true, treeBranches: { items: true } },
            order: { startAt: 'ASC' },
        });
        return events.map(events_mapper_1.toEventResponse);
    }
    async listDiscover(filters) {
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
        return events.map(events_mapper_1.toEventResponse);
    }
    locationSuggestions(query) {
        const normalized = query.trim().toLowerCase();
        const filtered = normalized
            ? LOCATION_SUGGESTIONS.filter((item) => item.label.toLowerCase().includes(normalized) || item.city.toLowerCase().includes(normalized))
            : LOCATION_SUGGESTIONS;
        return filtered.slice(0, 8);
    }
    async getById(userId, eventId) {
        const event = await this.findOwnedEvent(userId, eventId);
        return (0, events_mapper_1.toEventResponse)(event);
    }
    async create(userId, dto) {
        const owner = await this.usersRepository.findOne({ where: { id: userId } });
        if (!owner) {
            throw new common_1.NotFoundException('Owner not found');
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
    async update(userId, eventId, dto) {
        const event = await this.findOwnedEvent(userId, eventId);
        if (dto.name !== undefined && dto.name !== event.name) {
            event.name = dto.name;
            const slug = await this.makeUniqueSlug(dto.name, event.id);
            event.slug = slug;
            event.publicLink = dto.publicLink || `https://eventcloud.app/e/${slug}`;
        }
        if (dto.startAt !== undefined)
            event.startAt = new Date(dto.startAt);
        if (dto.location !== undefined)
            event.location = dto.location;
        if (dto.city !== undefined)
            event.city = dto.city;
        if (dto.address !== undefined)
            event.address = dto.address;
        if (dto.description !== undefined)
            event.description = dto.description;
        if (dto.publicLink !== undefined)
            event.publicLink = dto.publicLink;
        if (dto.status !== undefined)
            event.status = dto.status;
        if (dto.visibility !== undefined)
            event.visibility = dto.visibility;
        if (dto.format !== undefined)
            event.format = dto.format;
        await this.eventsRepository.save(event);
        await this.replaceNestedCollections(event, dto);
        return this.getById(userId, event.id);
    }
    async remove(userId, eventId) {
        const event = await this.findOwnedEvent(userId, eventId);
        await this.eventsRepository.remove(event);
        return { success: true };
    }
    async inviteParticipant(userId, eventId, dto) {
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
    async joinPublicEvent(slug, dto) {
        const event = await this.eventsRepository.findOne({
            where: { slug, visibility: 'public' },
            relations: { owner: true, participants: true, dayPlan: true, treeBranches: { items: true } },
        });
        if (!event) {
            throw new common_1.NotFoundException('Public event not found');
        }
        const existing = await this.participantsRepository.findOne({
            where: { event: { id: event.id }, email: dto.email },
        });
        if (!existing) {
            await this.participantsRepository.save(this.participantsRepository.create({
                event,
                email: dto.email,
                name: dto.name,
                role: dto.role,
                state: 'pending',
            }));
            await this.notificationsRepository.save(this.notificationsRepository.create({
                user: event.owner,
                type: 'request',
                title: 'New participation request',
                text: `${dto.name} wants to join ${event.name}`,
                isRead: false,
            }));
        }
        return { success: true };
    }
    async setParticipantState(userId, eventId, participantId, state) {
        const event = await this.findOwnedEvent(userId, eventId);
        const participant = await this.participantsRepository.findOne({
            where: { id: participantId, event: { id: event.id } },
        });
        if (!participant) {
            throw new common_1.NotFoundException('Participant not found');
        }
        participant.state = state;
        await this.participantsRepository.save(participant);
        return this.getById(userId, eventId);
    }
    async publicEventBySlug(slug) {
        const event = await this.eventsRepository.findOne({
            where: { slug },
            relations: { participants: true, dayPlan: true, treeBranches: { items: true } },
        });
        if (!event) {
            throw new common_1.NotFoundException('Public event not found');
        }
        return (0, events_mapper_1.toEventResponse)(event);
    }
    async findOwnedEvent(userId, eventId) {
        const event = await this.eventsRepository.findOne({
            where: { id: eventId },
            relations: { owner: true, participants: true, dayPlan: true, treeBranches: { items: true } },
        });
        if (!event) {
            throw new common_1.NotFoundException('Event not found');
        }
        if (event.owner.id !== userId) {
            throw new common_1.ForbiddenException('Access denied');
        }
        return event;
    }
    async makeUniqueSlug(name, excludeId) {
        const base = (0, slug_util_1.slugify)(name);
        let attempt = base;
        let index = 1;
        while (true) {
            const existing = await this.eventsRepository.findOne({ where: { slug: attempt } });
            if (!existing || existing.id === excludeId)
                return attempt;
            index += 1;
            attempt = `${base}-${index}`;
        }
    }
    async replaceNestedCollections(event, dto) {
        if (dto.dayPlan) {
            await this.dayPlanRepository.delete({ event: { id: event.id } });
            for (const item of dto.dayPlan) {
                await this.dayPlanRepository.save(this.dayPlanRepository.create({ ...item, event }));
            }
        }
        if (dto.team) {
            await this.participantsRepository.delete({ event: { id: event.id } });
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
                const savedBranch = await this.treeBranchesRepository.save(this.treeBranchesRepository.create({
                    title: branch.title,
                    state: branch.state,
                    event,
                }));
                for (const item of branch.items) {
                    await this.treeItemsRepository.save(this.treeItemsRepository.create({ value: item, branch: savedBranch }));
                }
            }
        }
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.EventEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(event_participant_entity_1.EventParticipantEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(event_day_plan_item_entity_1.EventDayPlanItemEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(event_tree_branch_entity_1.EventTreeBranchEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(event_tree_item_entity_1.EventTreeItemEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map