import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_settings')
export class UserSettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'dark' })
  theme: 'dark' | 'light';

  @Column({ default: 'ua' })
  language: 'ua' | 'en' | 'pl';

  @Column({ default: 'tree' })
  iconChoice: 'tree' | 'cloud' | 'petal';

  @Column({ default: 'balanced' })
  density: 'compact' | 'balanced';

  @Column({ default: 'full' })
  notificationsMode: 'silent' | 'full';

  @Column({ default: 'editor' })
  workspaceMode: 'editor' | 'control';

  @OneToOne(() => UserEntity, (user) => user.settings, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: UserEntity;
}
