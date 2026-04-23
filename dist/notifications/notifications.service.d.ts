import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/notification.entity';
export declare class NotificationsService {
    private readonly notificationsRepository;
    constructor(notificationsRepository: Repository<NotificationEntity>);
    list(userId: number): Promise<NotificationEntity[]>;
    markAllAsRead(userId: number): Promise<{
        success: boolean;
    }>;
}
