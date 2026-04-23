import { EventEntity } from './event.entity';
import { UserEntity } from '../../users/entities/user.entity';
export declare class EventParticipantEntity {
    id: number;
    name: string;
    role: string;
    state: 'confirmed' | 'pending';
    email?: string;
    user?: UserEntity | null;
    event: EventEntity;
}
