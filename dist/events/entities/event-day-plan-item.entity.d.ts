import { EventEntity } from './event.entity';
export declare class EventDayPlanItemEntity {
    id: number;
    time: string;
    label: string;
    owner: string;
    event: EventEntity;
}
