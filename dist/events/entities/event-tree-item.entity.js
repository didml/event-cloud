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
exports.EventTreeItemEntity = void 0;
const typeorm_1 = require("typeorm");
const event_tree_branch_entity_1 = require("./event-tree-branch.entity");
let EventTreeItemEntity = class EventTreeItemEntity {
};
exports.EventTreeItemEntity = EventTreeItemEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventTreeItemEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventTreeItemEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_tree_branch_entity_1.EventTreeBranchEntity, (branch) => branch.items, { onDelete: 'CASCADE' }),
    __metadata("design:type", event_tree_branch_entity_1.EventTreeBranchEntity)
], EventTreeItemEntity.prototype, "branch", void 0);
exports.EventTreeItemEntity = EventTreeItemEntity = __decorate([
    (0, typeorm_1.Entity)('event_tree_items')
], EventTreeItemEntity);
//# sourceMappingURL=event-tree-item.entity.js.map