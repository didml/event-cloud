import { z } from 'zod';

export const updateSettingsSchema = z.object({
  theme: z.enum(['dark', 'light']).optional(),
  language: z.enum(['ua', 'en', 'pl']).optional(),
  iconChoice: z.enum(['tree', 'cloud', 'petal']).optional(),
  density: z.enum(['compact', 'balanced']).optional(),
  notificationsMode: z.enum(['silent', 'full']).optional(),
  workspaceMode: z.enum(['editor', 'control']).optional(),
});

export type UpdateSettingsDto = z.infer<typeof updateSettingsSchema>;
