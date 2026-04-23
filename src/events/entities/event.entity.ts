import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { EventParticipantEntity } from './event-participant.entity';
import { EventDayPlanItemEntity } from './event-day-plan-item.entity';
import { EventTreeBranchEntity } from './event-tree-branch.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'timestamp' })
  startAt: Date;

  @Column()
  location: string;

  @Column({ nullable: true })
  city?: string | null;

  @Column({ nullable: true })
  address?: string | null;

  @Column({ type: 'text' })
  description: string;

  @Column({ unique: true })
  publicLink: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: 'plan' })
  status: 'live' | 'plan';

  @Column({ default: 'private' })
  visibility: 'private' | 'public';

  @Column({ default: 'offline' })
  format: 'offline' | 'online' | 'hybrid';

  @ManyToOne(() => UserEntity, (user) => user.ownedEvents, { onDelete: 'CASCADE' })
  owner: UserEntity;

  @OneToMany(() => EventParticipantEntity, (participant) => participant.event, { cascade: true })
  participants: EventParticipantEntity[];

  @OneToMany(() => EventDayPlanItemEntity, (item) => item.event, { cascade: true })
  dayPlan: EventDayPlanItemEntity[];

  @OneToMany(() => EventTreeBranchEntity, (branch) => branch.event, { cascade: true })
  treeBranches: EventTreeBranchEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
