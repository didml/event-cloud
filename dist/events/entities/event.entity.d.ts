import { UserEntity } from '../../users/entities/user.entity';
import { EventParticipantEntity } from './event-participant.entity';
import { EventDayPlanItemEntity } from './event-day-plan-item.entity';
import { EventTreeBranchEntity } from './event-tree-branch.entity';
export declare class EventEntity {
    id: number;
    name: string;
    startAt: Date;
    location: string;
    city?: string | null;
    address?: string | null;
    description: string;
    publicLink: string;
    slug: string;
    status: 'live' | 'plan';
    visibility: 'private' | 'public';
    format: 'offline' | 'online' | 'hybrid';
    owner: UserEntity;
    participants: EventParticipantEntity[];
    dayPlan: EventDayPlanItemEntity[];
    treeBranches: EventTreeBranchEntity[];
    createdAt: Date;
    updatedAt: Date;
}
