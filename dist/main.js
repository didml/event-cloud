"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./users/entities/user.entity");
const user_settings_entity_1 = require("./users/entities/user-settings.entity");
const event_entity_1 = require("./events/entities/event.entity");
const event_day_plan_item_entity_1 = require("./events/entities/event-day-plan-item.entity");
const event_participant_entity_1 = require("./events/entities/event-participant.entity");
const event_tree_branch_entity_1 = require("./events/entities/event-tree-branch.entity");
const event_tree_item_entity_1 = require("./events/entities/event-tree-item.entity");
async function seedDemoData(dataSource) {
    const usersRepo = dataSource.getRepository(user_entity_1.UserEntity);
    const settingsRepo = dataSource.getRepository(user_settings_entity_1.UserSettingsEntity);
    const eventsRepo = dataSource.getRepository(event_entity_1.EventEntity);
    const dayPlanRepo = dataSource.getRepository(event_day_plan_item_entity_1.EventDayPlanItemEntity);
    const participantsRepo = dataSource.getRepository(event_participant_entity_1.EventParticipantEntity);
    const branchRepo = dataSource.getRepository(event_tree_branch_entity_1.EventTreeBranchEntity);
    const itemRepo = dataSource.getRepository(event_tree_item_entity_1.EventTreeItemEntity);
    let user = await usersRepo.findOne({ where: { email: 'didenkooleksandr00@gmail.com' } });
    if (!user) {
        user = await usersRepo.save(usersRepo.create({
            email: 'didenkooleksandr00@gmail.com',
            fullName: 'Олександр Діденко',
            passwordHash: await bcrypt.hash('12345678', 10),
            role: 'Операційний власник',
            isActive: true,
        }));
        await settingsRepo.save(settingsRepo.create({
            user,
            theme: 'dark',
            language: 'ua',
            iconChoice: 'tree',
        }));
    }
    const count = await eventsRepo.count({ where: { owner: { id: user.id } } });
    if (count > 0)
        return;
    const event = await eventsRepo.save(eventsRepo.create({
        name: 'Огляд синхронізації фронтенду та демоверсії',
        startAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        location: 'Дніпро, Україна · Online room / Meet',
        city: 'Дніпро',
        address: 'Online room / Meet',
        description: 'Синхронізація дизайну, демо-потоку, фінальних правок та власників блоків.',
        slug: 'frontend-sync-demo-review',
        publicLink: 'https://eventcloud.app/e/frontend-sync-demo-review',
        status: 'plan',
        visibility: 'public',
        format: 'hybrid',
        owner: user,
    }));
    await dayPlanRepo.save([
        dayPlanRepo.create({ event, time: '11:30', label: 'Release blockers review', owner: 'Frontend lead' }),
        dayPlanRepo.create({ event, time: '11:50', label: 'Demo path check', owner: 'Product' }),
        dayPlanRepo.create({ event, time: '12:10', label: 'Ownership recap', owner: 'PM' }),
    ]);
    await participantsRepo.save([
        participantsRepo.create({ event, name: 'Максим Коваль', role: 'Frontend lead', state: 'confirmed', email: 'maksym@example.com' }),
        participantsRepo.create({ event, name: 'Ірина', role: 'Product', state: 'pending', email: 'iryna@example.com' }),
    ]);
    const branch = await branchRepo.save(branchRepo.create({ event, title: 'Основа', state: 'progress' }));
    const branch2 = await branchRepo.save(branchRepo.create({ event, title: 'Команда', state: 'draft' }));
    await itemRepo.save([
        itemRepo.create({ branch, value: 'Release-check.md' }),
        itemRepo.create({ branch, value: 'Demo-sequence' }),
        itemRepo.create({ branch: branch2, value: 'Frontend owners' }),
    ]);
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
    });
    app.setGlobalPrefix('api');
    const dataSource = app.get(typeorm_1.DataSource);
    await seedDemoData(dataSource);
    const port = Number(process.env.PORT || 10000);
    await app.listen(port);
    console.log(`Backend started on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map