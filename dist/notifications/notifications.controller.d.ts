import { NotificationsService } from './notifications.service';
import { AuthUser } from '../common/types/auth-user.type';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    list(user: AuthUser): Promise<import("./entities/notification.entity").NotificationEntity[]>;
    markAllAsRead(user: AuthUser): Promise<{
        success: boolean;
    }>;
}
