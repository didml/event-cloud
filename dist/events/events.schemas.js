"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinPublicEventSchema = exports.inviteParticipantSchema = exports.updateEventSchema = exports.createEventSchema = exports.treeBranchSchema = exports.teamItemSchema = exports.dayPlanItemSchema = exports.eventFormatSchema = exports.eventVisibilitySchema = exports.branchStateSchema = exports.participantStateSchema = exports.eventStatusSchema = void 0;
const zod_1 = require("zod");
exports.eventStatusSchema = zod_1.z.enum(['live', 'plan']);
exports.participantStateSchema = zod_1.z.enum(['confirmed', 'pending']);
exports.branchStateSchema = zod_1.z.enum(['ready', 'progress', 'draft']);
exports.eventVisibilitySchema = zod_1.z.enum(['private', 'public']);
exports.eventFormatSchema = zod_1.z.enum(['offline', 'online', 'hybrid']);
exports.dayPlanItemSchema = zod_1.z.object({
    time: zod_1.z.string().min(1).max(20),
    label: zod_1.z.string().min(1).max(255),
    owner: zod_1.z.string().min(1).max(120),
});
exports.teamItemSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(120),
    role: zod_1.z.string().min(1).max(120),
    state: exports.participantStateSchema,
    email: zod_1.z.string().email().optional(),
});
exports.treeBranchSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(120),
    state: exports.branchStateSchema,
    items: zod_1.z.array(zod_1.z.string().min(1).max(255)).default([]),
});
exports.createEventSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(150),
    startAt: zod_1.z.string().datetime(),
    location: zod_1.z.string().min(2).max(255),
    city: zod_1.z.string().min(2).max(120).optional(),
    address: zod_1.z.string().min(2).max(255).optional(),
    description: zod_1.z.string().min(3).max(5000),
    publicLink: zod_1.z.string().url().optional(),
    visibility: exports.eventVisibilitySchema.default('private'),
    format: exports.eventFormatSchema.default('offline'),
    status: exports.eventStatusSchema.default('plan'),
    dayPlan: zod_1.z.array(exports.dayPlanItemSchema).default([]),
    team: zod_1.z.array(exports.teamItemSchema).default([]),
    tree: zod_1.z.array(exports.treeBranchSchema).default([]),
});
exports.updateEventSchema = exports.createEventSchema.partial();
exports.inviteParticipantSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    role: zod_1.z.string().min(1).max(120),
    name: zod_1.z.string().min(1).max(120).optional(),
});
exports.joinPublicEventSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(2).max(120),
    role: zod_1.z.string().min(2).max(120).default('Гість'),
});
//# sourceMappingURL=events.schemas.js.map