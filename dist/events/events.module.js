"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const events_controller_1 = require("./events.controller");
const events_service_1 = require("./events.service");
const event_entity_1 = require("./entities/event.entity");
const event_participant_entity_1 = require("./entities/event-participant.entity");
const event_day_plan_item_entity_1 = require("./entities/event-day-plan-item.entity");
const event_tree_branch_entity_1 = require("./entities/event-tree-branch.entity");
const event_tree_item_entity_1 = require("./entities/event-tree-item.entity");
const user_entity_1 = require("../users/entities/user.entity");
const notification_entity_1 = require("../notifications/entities/notification.entity");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                event_entity_1.EventEntity,
                event_participant_entity_1.EventParticipantEntity,
                event_day_plan_item_entity_1.EventDayPlanItemEntity,
                event_tree_branch_entity_1.EventTreeBranchEntity,
                event_tree_item_entity_1.EventTreeItemEntity,
                user_entity_1.UserEntity,
                notification_entity_1.NotificationEntity,
            ]),
        ],
        controllers: [events_controller_1.EventsController],
        providers: [events_service_1.EventsService],
        exports: [events_service_1.EventsService],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map