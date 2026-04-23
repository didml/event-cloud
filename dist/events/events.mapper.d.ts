import { EventEntity } from './entities/event.entity';
export declare function toEventResponse(event: EventEntity): {
    id: number;
    name: string;
    startAt: string;
    location: string;
    city: string;
    address: string;
    description: string;
    publicLink: string;
    slug: string;
    status: "plan" | "live";
    visibility: "private" | "public";
    format: "offline" | "online" | "hybrid";
    participants: number;
    treeItems: number;
    dayPlan: {
        id: number;
        time: string;
        label: string;
        owner: string;
    }[];
    team: {
        id: number;
        name: string;
        role: string;
        state: "pending" | "confirmed";
        email: string;
    }[];
    tree: {
        id: number;
        title: string;
        state: "draft" | "ready" | "progress";
        items: string[];
    }[];
};
