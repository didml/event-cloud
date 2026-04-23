import { EventEntity } from '../../events/entities/event.entity';
import { EventParticipantEntity } from '../../events/entities/event-participant.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';
import { UserSettingsEntity } from './user-settings.entity';
export declare class UserEntity {
    id: number;
    email: string;
    passwordHash: string;
    fullName: string;
    role: string;
    isActive: boolean;
    ownedEvents: EventEntity[];
    eventMemberships: EventParticipantEntity[];
    notifications: NotificationEntity[];
    settings: UserSettingsEntity;
    createdAt: Date;
    updatedAt: Date;
}
