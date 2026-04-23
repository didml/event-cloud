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
exports.EventTreeBranchEntity = void 0;
const typeorm_1 = require("typeorm");
const event_entity_1 = require("./event.entity");
const event_tree_item_entity_1 = require("./event-tree-item.entity");
let EventTreeBranchEntity = class EventTreeBranchEntity {
};
exports.EventTreeBranchEntity = EventTreeBranchEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EventTreeBranchEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventTreeBranchEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'draft' }),
    __metadata("design:type", String)
], EventTreeBranchEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => event_entity_1.EventEntity, (event) => event.treeBranches, { onDelete: 'CASCADE' }),
    __metadata("design:type", event_entity_1.EventEntity)
], EventTreeBranchEntity.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_tree_item_entity_1.EventTreeItemEntity, (item) => item.branch, { cascade: true }),
    __metadata("design:type", Array)
], EventTreeBranchEntity.prototype, "items", void 0);
exports.EventTreeBranchEntity = EventTreeBranchEntity = __decorate([
    (0, typeorm_1.Entity)('event_tree_branches')
], EventTreeBranchEntity);
//# sourceMappingURL=event-tree-branch.entity.js.map