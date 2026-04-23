import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: unknown): Promise<{
        accessToken: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            role: string;
        };
    }>;
    login(body: unknown): Promise<{
        accessToken: string;
        user: {
            id: number;
            email: string;
            fullName: string;
            role: string;
        };
    }>;
}
