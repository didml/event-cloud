import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSettingsEntity } from './entities/user-settings.entity';
import { UpdateSettingsDto } from './users.schemas';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(UserSettingsEntity)
    private readonly settingsRepository: Repository<UserSettingsEntity>,
  ) {}

  async getMe(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { settings: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      settings: user.settings,
    };
  }

  async updateSettings(userId: number, dto: UpdateSettingsDto) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { settings: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.settings) {
      user.settings = this.settingsRepository.create({ user });
      await this.settingsRepository.save(user.settings);
    }

    Object.assign(user.settings, dto);
    return this.settingsRepository.save(user.settings);
  }
}
