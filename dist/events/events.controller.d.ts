import { EventsService } from './events.service';
import { AuthUser } from '../common/types/auth-user.type';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    listMy(user: AuthUser): Promise<{
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
    }[]>;
    discover(query?: string, format?: string, visibility?: string): Promise<{
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
    }[]>;
    locations(query?: string): {
        city: string;
        country: string;
        address: string;
        label: string;
    }[];
    getPublic(slug: string): Promise<{
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
    }>;
    joinPublic(slug: string, body: unknown): Promise<{
        success: boolean;
    }>;
    getOne(user: AuthUser, id: string): Promise<{
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
    }>;
    create(user: AuthUser, body: unknown): Promise<{
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
    }>;
    update(user: AuthUser, id: string, body: unknown): Promise<{
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
    }>;
    remove(user: AuthUser, id: string): Promise<{
        success: boolean;
    }>;
    invite(user: AuthUser, id: string, body: unknown): Promise<{
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
    }>;
    confirm(user: AuthUser, id: string, participantId: string): Promise<{
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
    }>;
    pending(user: AuthUser, id: string, participantId: string): Promise<{
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
    }>;
}
