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
exports.EventEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const event_participant_entity_1 = require("./event-participant.entity");
const event_day_plan_item_entity_1 = require("./event-day-plan-item.entity");
const event_tree_branch_entity_1 = require("./event-tree-branch.entity");
let EventEntity = class EventEntity {
};
exports.EventEntity = EventEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], EventEntity.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EventEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EventEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], EventEntity.prototype, "publicLink", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], EventEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'plan' }),
    __metadata("design:type", String)
], EventEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'private' }),
    __metadata("design:type", String)
], EventEntity.prototype, "visibility", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'offline' }),
    __metadata("design:type", String)
], EventEntity.prototype, "format", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.ownedEvents, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.UserEntity)
], EventEntity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_participant_entity_1.EventParticipantEntity, (participant) => participant.event, { cascade: true }),
    __metadata("design:type", Array)
], EventEntity.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_day_plan_item_entity_1.EventDayPlanItemEntity, (item) => item.event, { cascade: true }),
    __metadata("design:type", Array)
], EventEntity.prototype, "dayPlan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_tree_branch_entity_1.EventTreeBranchEntity, (branch) => branch.event, { cascade: true }),
    __metadata("design:type", Array)
], EventEntity.prototype, "treeBranches", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], EventEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], EventEntity.prototype, "updatedAt", void 0);
exports.EventEntity = EventEntity = __decorate([
    (0, typeorm_1.Entity)('events')
], EventEntity);
//# sourceMappingURL=event.entity.js.map