import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './users/entities/user.entity';
import { UserSettingsEntity } from './users/entities/user-settings.entity';
import { EventEntity } from './events/entities/event.entity';
import { EventDayPlanItemEntity } from './events/entities/event-day-plan-item.entity';
import { EventParticipantEntity } from './events/entities/event-participant.entity';
import { EventTreeBranchEntity } from './events/entities/event-tree-branch.entity';
import { EventTreeItemEntity } from './events/entities/event-tree-item.entity';

async function seedDemoData(dataSource: DataSource) {
  const usersRepo = dataSource.getRepository(UserEntity);
  const settingsRepo = dataSource.getRepository(UserSettingsEntity);
  const eventsRepo = dataSource.getRepository(EventEntity);
  const dayPlanRepo = dataSource.getRepository(EventDayPlanItemEntity);
  const participantsRepo = dataSource.getRepository(EventParticipantEntity);
  const branchRepo = dataSource.getRepository(EventTreeBranchEntity);
  const itemRepo = dataSource.getRepository(EventTreeItemEntity);

  let user = await usersRepo.findOne({ where: { email: 'didenkooleksandr00@gmail.com' } });
  if (!user) {
    user = await usersRepo.save(
      usersRepo.create({
        email: 'didenkooleksandr00@gmail.com',
        fullName: 'Олександр Діденко',
        passwordHash: await bcrypt.hash('12345678', 10),
        role: 'Операційний власник',
        isActive: true,
      }),
    );
    await settingsRepo.save(
      settingsRepo.create({
        user,
        theme: 'dark',
        language: 'ua',
        iconChoice: 'tree',
      }),
    );
  }

  const count = await eventsRepo.count({ where: { owner: { id: user.id } } });
  if (count > 0) return;

  const event = await eventsRepo.save(
    eventsRepo.create({
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
    }),
  );

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
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('api');

  const dataSource = app.get(DataSource);
  await seedDemoData(dataSource);

  const port = Number(process.env.PORT || 10000);
  await app.listen(port);
  console.log(`Backend started on port ${port}`);
}

bootstrap();