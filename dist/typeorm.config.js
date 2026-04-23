"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const user_entity_1 = require("./users/entities/user.entity");
const user_settings_entity_1 = require("./users/entities/user-settings.entity");
const event_entity_1 = require("./events/entities/event.entity");
const event_participant_entity_1 = require("./events/entities/event-participant.entity");
const event_day_plan_item_entity_1 = require("./events/entities/event-day-plan-item.entity");
const event_tree_branch_entity_1 = require("./events/entities/event-tree-branch.entity");
const event_tree_item_entity_1 = require("./events/entities/event-tree-item.entity");
const notification_entity_1 = require("./notifications/entities/notification.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [
        user_entity_1.UserEntity,
        user_settings_entity_1.UserSettingsEntity,
        event_entity_1.EventEntity,
        event_participant_entity_1.EventParticipantEntity,
        event_day_plan_item_entity_1.EventDayPlanItemEntity,
        event_tree_branch_entity_1.EventTreeBranchEntity,
        event_tree_item_entity_1.EventTreeItemEntity,
        notification_entity_1.NotificationEntity,
    ],
    synchronize: true,
    logging: true,
    ssl: {
        rejectUnauthorized: false,
    },
};
//# sourceMappingURL=typeorm.config.js.map