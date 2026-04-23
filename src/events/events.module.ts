import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventEntity } from './entities/event.entity';
import { EventParticipantEntity } from './entities/event-participant.entity';
import { EventDayPlanItemEntity } from './entities/event-day-plan-item.entity';
import { EventTreeBranchEntity } from './entities/event-tree-branch.entity';
import { EventTreeItemEntity } from './entities/event-tree-item.entity';
import { UserEntity } from '../users/entities/user.entity';
import { NotificationEntity } from '../notifications/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EventEntity,
      EventParticipantEntity,
      EventDayPlanItemEntity,
      EventTreeBranchEntity,
      EventTreeItemEntity,
      UserEntity,
      NotificationEntity,
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
