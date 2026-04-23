import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventTreeBranchEntity } from './event-tree-branch.entity';

@Entity('event_tree_items')
export class EventTreeItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => EventTreeBranchEntity, (branch) => branch.items, { onDelete: 'CASCADE' })
  branch: EventTreeBranchEntity;
}
