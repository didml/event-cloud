import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { UserSettingsEntity } from '../users/entities/user-settings.entity';
import { LoginDto, RegisterDto } from './auth.schemas';
export declare class AuthService {
    private readonly usersRepository;
    private readonly settingsRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<UserEntity>, settingsRepository: Repository<UserSettingsEntity>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            role: string;
        };
    }>;
    private buildAuthResponse;
}
