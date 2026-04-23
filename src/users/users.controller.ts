import { Body, Controller, Get, Patch, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AuthUser } from '../common/types/auth-user.type';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { updateSettingsSchema } from './users.schemas';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: AuthUser) {
    return this.usersService.getMe(user.sub);
  }

  @Patch('settings')
  @UsePipes(new ZodValidationPipe(updateSettingsSchema))
  updateSettings(@CurrentUser() user: AuthUser, @Body() body: unknown) {
    return this.usersService.updateSettings(user.sub, body as any);
  }
}
