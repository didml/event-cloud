import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';

@Entity('event_day_plan_items')
export class EventDayPlanItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string;

  @Column()
  label: string;

  @Column()
  owner: string;

  @ManyToOne(() => EventEntity, (event) => event.dayPlan, { onDelete: 'CASCADE' })
  event: EventEntity;
}
