import { LucideIcon } from 'lucide-react';

export type Session = {
  id: string;
  userId: string;
  duration: number; // in seconds
  startTime: Date;
  endTime: Date;
  notes?: string;
  moodRating?: number; // 1 to 5
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  goalMinutesPerWeek: number;
  totalMeditationMinutes: number;
  sessions: Session[];
};

export type Stats = {
  totalSessions: number;
  totalMinutes: number;
  averageSessionLength: number; // in minutes
  moodRatings: number[]; // array of mood ratings
};

export type TimerProps = {
  initialDuration: number; // in seconds
  onComplete: () => void;
  onCancel: () => void;
};

export type IconProps = {
  icon: LucideIcon;
  size?: number;
  color?: string;
};