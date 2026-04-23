"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettingsSchema = void 0;
const zod_1 = require("zod");
exports.updateSettingsSchema = zod_1.z.object({
    theme: zod_1.z.enum(['dark', 'light']).optional(),
    language: zod_1.z.enum(['ua', 'en', 'pl']).optional(),
    iconChoice: zod_1.z.enum(['tree', 'cloud', 'petal']).optional(),
    density: zod_1.z.enum(['compact', 'balanced']).optional(),
    notificationsMode: zod_1.z.enum(['silent', 'full']).optional(),
    workspaceMode: zod_1.z.enum(['editor', 'control']).optional(),
});
//# sourceMappingURL=users.schemas.js.map