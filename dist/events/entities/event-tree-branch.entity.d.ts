import { EventEntity } from './event.entity';
import { EventTreeItemEntity } from './event-tree-item.entity';
export declare class EventTreeBranchEntity {
    id: number;
    title: string;
    state: 'ready' | 'progress' | 'draft';
    event: EventEntity;
    items: EventTreeItemEntity[];
}
