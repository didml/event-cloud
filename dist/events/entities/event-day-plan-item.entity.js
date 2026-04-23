"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDayPlanItemEntity = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("./event.entity");
let EventDayPlanItemEntity = class EventDayPlanItemEntity {
};
exports.EventDayPlanItemEntity = EventDayPlanItemEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventDayPlanItemEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventDayPlanItemEntity.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventDayPlanItemEntity.prototype, "label", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventDayPlanItemEntity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.EventEntity, (event) => event.dayPlan, { onDelete: 'CASCADE' }),
    __metadata("design:type", event_entity_1.EventEntity)
], EventDayPlanItemEntity.prototype, "event", void 0);
exports.EventDayPlanItemEntity = EventDayPlanItemEntity = __decorate([
    (0, typeorm_1.Entity)('event_day_plan_items')
], EventDayPlanItemEntity);
//# sourceMappingURL=event-day-plan-item.entity.js.map