import { UserEntity } from './user.entity';
export declare class UserSettingsEntity {
    id: number;
    theme: 'dark' | 'light';
    language: 'ua' | 'en' | 'pl';
    iconChoice: 'tree' | 'cloud' | 'petal';
    density: 'compact' | 'balanced';
    notificationsMode: 'silent' | 'full';
    workspaceMode: 'editor' | 'control';
    user: UserEntity;
}
