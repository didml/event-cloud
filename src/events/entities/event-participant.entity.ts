import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Entity('event_participants')
export class EventParticipantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column({ default: 'pending' })
  state: 'confirmed' | 'pending';

  @Column({ nullable: true })
  email?: string;

  @ManyToOne(() => UserEntity, (user) => user.eventMemberships, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user?: UserEntity | null;

  @ManyToOne(() => EventEntity, (event) => event.participants, { onDelete: 'CASCADE' })
  event: EventEntity;
}
