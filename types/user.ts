import { LucideIcon } from 'lucide-react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  meditationGoals: MeditationGoals;
  sessionHistory: MeditationSession[];
}

export interface MeditationGoals {
  dailyMinutes: number;
  weeklyMinutes: number;
}

export interface MeditationSession {
  sessionId: string;
  durationMinutes: number;
  date: Date;
}

export interface UserStats {
  totalMinutes: number;
  averageSessionDuration: number;
  sessionsThisWeek: number;
}

export interface User {
  profile: UserProfile;
  stats: UserStats;
}

export const UserIcon: LucideIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9 9 0 1118.364 4.56M12 7v5l3 3" />
  </svg>
);