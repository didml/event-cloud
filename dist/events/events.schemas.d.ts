import { z } from 'zod';
export declare const eventStatusSchema: z.ZodEnum<["live", "plan"]>;
export declare const participantStateSchema: z.ZodEnum<["confirmed", "pending"]>;
export declare const branchStateSchema: z.ZodEnum<["ready", "progress", "draft"]>;
export declare const eventVisibilitySchema: z.ZodEnum<["private", "public"]>;
export declare const eventFormatSchema: z.ZodEnum<["offline", "online", "hybrid"]>;
export declare const dayPlanItemSchema: z.ZodObject<{
    time: z.ZodString;
    label: z.ZodString;
    owner: z.ZodString;
}, "strip", z.ZodTypeAny, {
    time?: string;
    label?: string;
    owner?: string;
}, {
    time?: string;
    label?: string;
    owner?: string;
}>;
export declare const teamItemSchema: z.ZodObject<{
    name: z.ZodString;
    role: z.ZodString;
    state: z.ZodEnum<["confirmed", "pending"]>;
    email: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    role?: string;
    state?: "pending" | "confirmed";
    email?: string;
}, {
    name?: string;
    role?: string;
    state?: "pending" | "confirmed";
    email?: string;
}>;
export declare const treeBranchSchema: z.ZodObject<{
    title: z.ZodString;
    state: z.ZodEnum<["ready", "progress", "draft"]>;
    items: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    state?: "draft" | "ready" | "progress";
    title?: string;
    items?: string[];
}, {
    state?: "draft" | "ready" | "progress";
    title?: string;
    items?: string[];
}>;
export declare const createEventSchema: z.ZodObject<{
    name: z.ZodString;
    startAt: z.ZodString;
    location: z.ZodString;
    city: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    description: z.ZodString;
    publicLink: z.ZodOptional<z.ZodString>;
    visibility: z.ZodDefault<z.ZodEnum<["private", "public"]>>;
    format: z.ZodDefault<z.ZodEnum<["offline", "online", "hybrid"]>>;
    status: z.ZodDefault<z.ZodEnum<["live", "plan"]>>;
    dayPlan: z.ZodDefault<z.ZodArray<z.ZodObject<{
        time: z.ZodString;
        label: z.ZodString;
        owner: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        time?: string;
        label?: string;
        owner?: string;
    }, {
        time?: string;
        label?: string;
        owner?: string;
    }>, "many">>;
    team: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        role: z.ZodString;
        state: z.ZodEnum<["confirmed", "pending"]>;
        email: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }, {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }>, "many">>;
    tree: z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        state: z.ZodEnum<["ready", "progress", "draft"]>;
        items: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }, {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    startAt?: string;
    location?: string;
    city?: string;
    address?: string;
    description?: string;
    publicLink?: string;
    status?: "plan" | "live";
    visibility?: "private" | "public";
    format?: "offline" | "online" | "hybrid";
    dayPlan?: {
        time?: string;
        label?: string;
        owner?: string;
    }[];
    tree?: {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }[];
    team?: {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }[];
}, {
    name?: string;
    startAt?: string;
    location?: string;
    city?: string;
    address?: string;
    description?: string;
    publicLink?: string;
    status?: "plan" | "live";
    visibility?: "private" | "public";
    format?: "offline" | "online" | "hybrid";
    dayPlan?: {
        time?: string;
        label?: string;
        owner?: string;
    }[];
    tree?: {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }[];
    team?: {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }[];
}>;
export declare const updateEventSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    startAt: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
    publicLink: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["private", "public"]>>>;
    format: z.ZodOptional<z.ZodDefault<z.ZodEnum<["offline", "online", "hybrid"]>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["live", "plan"]>>>;
    dayPlan: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        time: z.ZodString;
        label: z.ZodString;
        owner: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        time?: string;
        label?: string;
        owner?: string;
    }, {
        time?: string;
        label?: string;
        owner?: string;
    }>, "many">>>;
    team: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        role: z.ZodString;
        state: z.ZodEnum<["confirmed", "pending"]>;
        email: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }, {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }>, "many">>>;
    tree: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        state: z.ZodEnum<["ready", "progress", "draft"]>;
        items: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }, {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    startAt?: string;
    location?: string;
    city?: string;
    address?: string;
    description?: string;
    publicLink?: string;
    status?: "plan" | "live";
    visibility?: "private" | "public";
    format?: "offline" | "online" | "hybrid";
    dayPlan?: {
        time?: string;
        label?: string;
        owner?: string;
    }[];
    tree?: {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }[];
    team?: {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }[];
}, {
    name?: string;
    startAt?: string;
    location?: string;
    city?: string;
    address?: string;
    description?: string;
    publicLink?: string;
    status?: "plan" | "live";
    visibility?: "private" | "public";
    format?: "offline" | "online" | "hybrid";
    dayPlan?: {
        time?: string;
        label?: string;
        owner?: string;
    }[];
    tree?: {
        state?: "draft" | "ready" | "progress";
        title?: string;
        items?: string[];
    }[];
    team?: {
        name?: string;
        role?: string;
        state?: "pending" | "confirmed";
        email?: string;
    }[];
}>;
export declare const inviteParticipantSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    role?: string;
    email?: string;
}, {
    name?: string;
    role?: string;
    email?: string;
}>;
export declare const joinPublicEventSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    role: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    role?: string;
    email?: string;
}, {
    name?: string;
    role?: string;
    email?: string;
}>;
export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
export type InviteParticipantDto = z.infer<typeof inviteParticipantSchema>;
export type JoinPublicEventDto = z.infer<typeof joinPublicEventSchema>;
