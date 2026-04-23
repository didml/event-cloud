import { UserEntity } from '../../users/entities/user.entity';
export declare class NotificationEntity {
    id: number;
    type: string;
    title: string;
    text: string;
    isRead: boolean;
    user: UserEntity;
    createdAt: Date;
}
