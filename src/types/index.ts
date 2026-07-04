export interface HardwareComponent {
  id: string;
  category: string;
  title: string;
  value: string;
  icon: string;
  description: string;
}

export interface SteamProfile {
  steamId: string;
  nickname: string;
  avatarUrl: string;
  status: 'online' | 'offline' | 'in-game' | 'away' | 'busy';
  level: number;
  gamesCount: number;
  totalHoursPlayed: number;
  friendsCount: number;
}

export interface SteamGame {
  appId: number;
  name: string;
  imageUrl: string;
  hoursPlayed: number;
  lastPlayed: string | null;
  isFavorite: boolean;
}

export interface SteamAchievement {
  gameName: string;
  achievementName: string;
  description: string;
  unlockedAt: string;
  iconUrl: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  logoUrl: string;
  technologies: string[];
  screenshots: string[];
  githubUrl?: string;
  demoUrl?: string;
  status: 'completed' | 'in-progress' | 'archived';
  year: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
  level: number;
  icon: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: string;
}

export type SectionId =
    | 'hero'
    | 'hardware'
    | 'steam'
    | 'projects'
    | 'skills'
    | 'statistics'
    | 'contacts';