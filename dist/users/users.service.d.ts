import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSettingsEntity } from './entities/user-settings.entity';
import { UpdateSettingsDto } from './users.schemas';
export declare class UsersService {
    private readonly usersRepository;
    private readonly settingsRepository;
    constructor(usersRepository: Repository<UserEntity>, settingsRepository: Repository<UserSettingsEntity>);
    getMe(userId: number): Promise<{
        id: number;
        email: string;
        fullName: string;
        role: string;
        settings: UserSettingsEntity;
    }>;
    updateSettings(userId: number, dto: UpdateSettingsDto): Promise<UserSettingsEntity>;
}
