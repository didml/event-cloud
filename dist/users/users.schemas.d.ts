import { z } from 'zod';
export declare const updateSettingsSchema: z.ZodObject<{
    theme: z.ZodOptional<z.ZodEnum<["dark", "light"]>>;
    language: z.ZodOptional<z.ZodEnum<["ua", "en", "pl"]>>;
    iconChoice: z.ZodOptional<z.ZodEnum<["tree", "cloud", "petal"]>>;
    density: z.ZodOptional<z.ZodEnum<["compact", "balanced"]>>;
    notificationsMode: z.ZodOptional<z.ZodEnum<["silent", "full"]>>;
    workspaceMode: z.ZodOptional<z.ZodEnum<["editor", "control"]>>;
}, "strip", z.ZodTypeAny, {
    theme?: "dark" | "light";
    language?: "ua" | "en" | "pl";
    iconChoice?: "tree" | "cloud" | "petal";
    density?: "balanced" | "compact";
    notificationsMode?: "full" | "silent";
    workspaceMode?: "editor" | "control";
}, {
    theme?: "dark" | "light";
    language?: "ua" | "en" | "pl";
    iconChoice?: "tree" | "cloud" | "petal";
    density?: "balanced" | "compact";
    notificationsMode?: "full" | "silent";
    workspaceMode?: "editor" | "control";
}>;
export type UpdateSettingsDto = z.infer<typeof updateSettingsSchema>;
