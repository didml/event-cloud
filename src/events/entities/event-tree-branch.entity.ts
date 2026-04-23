import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventEntity } from './event.entity';
import { EventTreeItemEntity } from './event-tree-item.entity';

@Entity('event_tree_branches')
export class EventTreeBranchEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'draft' })
  state: 'ready' | 'progress' | 'draft';

  @ManyToOne(() => EventEntity, (event) => event.treeBranches, { onDelete: 'CASCADE' })
  event: EventEntity;

  @OneToMany(() => EventTreeItemEntity, (item) => item.branch, { cascade: true })
  items: EventTreeItemEntity[];
}
