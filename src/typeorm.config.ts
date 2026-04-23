import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { UserSettingsEntity } from './users/entities/user-settings.entity';
import { EventEntity } from './events/entities/event.entity';
import { EventParticipantEntity } from './events/entities/event-participant.entity';
import { EventDayPlanItemEntity } from './events/entities/event-day-plan-item.entity';
import { EventTreeBranchEntity } from './events/entities/event-tree-branch.entity';
import { EventTreeItemEntity } from './events/entities/event-tree-item.entity';
import { NotificationEntity } from './notifications/entities/notification.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [
    UserEntity,
    UserSettingsEntity,
    EventEntity,
    EventParticipantEntity,
    EventDayPlanItemEntity,
    EventTreeBranchEntity,
    EventTreeItemEntity,
    NotificationEntity,
  ],
  synchronize: true,
  logging: true,
};