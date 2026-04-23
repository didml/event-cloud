import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventEntity } from '../../events/entities/event.entity';
import { EventParticipantEntity } from '../../events/entities/event-participant.entity';
import { NotificationEntity } from '../../notifications/entities/notification.entity';
import { UserSettingsEntity } from './user-settings.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column()
  fullName: string;

  @Column({ default: 'operations-owner' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => EventEntity, (event) => event.owner)
  ownedEvents: EventEntity[];

  @OneToMany(() => EventParticipantEntity, (participant) => participant.user)
  eventMemberships: EventParticipantEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToOne(() => UserSettingsEntity, (settings) => settings.user)
  settings: UserSettingsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
