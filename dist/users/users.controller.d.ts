import { UsersService } from './users.service';
import { AuthUser } from '../common/types/auth-user.type';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: AuthUser): Promise<{
        id: number;
        email: string;
        fullName: string;
        role: string;
        settings: import("./entities/user-settings.entity").UserSettingsEntity;
    }>;
    updateSettings(user: AuthUser, body: unknown): Promise<import("./entities/user-settings.entity").UserSettingsEntity>;
}
