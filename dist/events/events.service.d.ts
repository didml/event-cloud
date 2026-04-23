import { Repository } from 'typeorm';
import { EventEntity } from './entities/event.entity';
import { EventParticipantEntity } from './entities/event-participant.entity';
import { EventDayPlanItemEntity } from './entities/event-day-plan-item.entity';
import { EventTreeBranchEntity } from './entities/event-tree-branch.entity';
import { EventTreeItemEntity } from './entities/event-tree-item.entity';
import { CreateEventDto, InviteParticipantDto, JoinPublicEventDto, UpdateEventDto } from './events.schemas';
import { UserEntity } from '../users/entities/user.entity';
import { NotificationEntity } from '../notifications/entities/notification.entity';
export declare class EventsService {
    private readonly eventsRepository;
    private readonly participantsRepository;
    private readonly dayPlanRepository;
    private readonly treeBranchesRepository;
    private readonly treeItemsRepository;
    private readonly usersRepository;
    private readonly notificationsRepository;
    constructor(eventsRepository: Repository<EventEntity>, participantsRepository: Repository<EventParticipantEntity>, dayPlanRepository: Repository<EventDayPlanItemEntity>, treeBranchesRepository: Repository<EventTreeBranchEntity>, treeItemsRepository: Repository<EventTreeItemEntity>, usersRepository: Repository<UserEntity>, notificationsRepository: Repository<NotificationEntity>);
    listMyEvents(userId: number): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }[]>;
    listDiscover(filters: {
        query?: string;
        format?: string;
        visibility?: string;
    }): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }[]>;
    locationSuggestions(query: string): {
        city: string;
        country: string;
        address: string;
        label: string;
    }[];
    getById(userId: number, eventId: number): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }>;
    create(userId: number, dto: CreateEventDto): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }>;
    update(userId: number, eventId: number, dto: UpdateEventDto): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }>;
    remove(userId: number, eventId: number): Promise<{
        success: boolean;
    }>;
    inviteParticipant(userId: number, eventId: number, dto: InviteParticipantDto): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }>;
    joinPublicEvent(slug: string, dto: JoinPublicEventDto): Promise<{
        success: boolean;
    }>;
    setParticipantState(userId: number, eventId: number, participantId: number, state: 'confirmed' | 'pending'): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }>;
    publicEventBySlug(slug: string): Promise<{
        id: number;
        name: string;
        startAt: string;
        location: string;
        city: string;
        address: string;
        description: string;
        publicLink: string;
        slug: string;
        status: "plan" | "live";
        visibility: "private" | "public";
        format: "offline" | "online" | "hybrid";
        participants: number;
        treeItems: number;
        dayPlan: {
            id: number;
            time: string;
            label: string;
            owner: string;
        }[];
        team: {
            id: number;
            name: string;
            role: string;
            state: "pending" | "confirmed";
            email: string;
        }[];
        tree: {
            id: number;
            title: string;
            state: "draft" | "ready" | "progress";
            items: string[];
        }[];
    }>;
    private findOwnedEvent;
    private makeUniqueSlug;
    private replaceNestedCollections;
}
