import { z } from 'zod';

export const eventStatusSchema = z.enum(['live', 'plan']);
export const participantStateSchema = z.enum(['confirmed', 'pending']);
export const branchStateSchema = z.enum(['ready', 'progress', 'draft']);
export const eventVisibilitySchema = z.enum(['private', 'public']);
export const eventFormatSchema = z.enum(['offline', 'online', 'hybrid']);

export const dayPlanItemSchema = z.object({
  time: z.string().min(1).max(20),
  label: z.string().min(1).max(255),
  owner: z.string().min(1).max(120),
});

export const teamItemSchema = z.object({
  name: z.string().min(1).max(120),
  role: z.string().min(1).max(120),
  state: participantStateSchema,
  email: z.string().email().optional(),
});

export const treeBranchSchema = z.object({
  title: z.string().min(1).max(120),
  state: branchStateSchema,
  items: z.array(z.string().min(1).max(255)).default([]),
});

export const createEventSchema = z.object({
  name: z.string().min(2).max(150),
  startAt: z.string().datetime(),
  location: z.string().min(2).max(255),
  city: z.string().min(2).max(120).optional(),
  address: z.string().min(2).max(255).optional(),
  description: z.string().min(3).max(5000),
  publicLink: z.string().url().optional(),
  visibility: eventVisibilitySchema.default('private'),
  format: eventFormatSchema.default('offline'),
  status: eventStatusSchema.default('plan'),
  dayPlan: z.array(dayPlanItemSchema).default([]),
  team: z.array(teamItemSchema).default([]),
  tree: z.array(treeBranchSchema).default([]),
});

export const updateEventSchema = createEventSchema.partial();

export const inviteParticipantSchema = z.object({
  email: z.string().email(),
  role: z.string().min(1).max(120),
  name: z.string().min(1).max(120).optional(),
});

export const joinPublicEventSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(120),
  role: z.string().min(2).max(120).default('Гість'),
});

export type CreateEventDto = z.infer<typeof createEventSchema>;
export type UpdateEventDto = z.infer<typeof updateEventSchema>;
export type InviteParticipantDto = z.infer<typeof inviteParticipantSchema>;
export type JoinPublicEventDto = z.infer<typeof joinPublicEventSchema>;
