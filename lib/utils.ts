import { LucideIcon } from 'lucide-react';

/**
 * Represents a meditation session.
 */
export type MeditationSession = {
  id: string;
  duration: number; // in seconds
  date: Date;
};

/**
 * Represents user profile information.
 */
export type UserProfile = {
  id: string;
  name: string;
  sessions: MeditationSession[];
};

/**
 * Calculates the total meditation time from a list of sessions.
 * @param sessions - Array of meditation sessions.
 * @returns Total meditation time in seconds.
 */
export function calculateTotalMeditationTime(sessions: MeditationSession[]): number {
  if (!Array.isArray(sessions)) throw new Error('Invalid sessions array');
  return sessions.reduce((total, session) => total + session.duration, 0);
}

/**
 * Formats a duration in seconds to a human-readable string.
 * @param seconds - Duration in seconds.
 * @returns Formatted time string.
 */
export function formatDuration(seconds: number): string {
  if (typeof seconds !== 'number' || seconds < 0) throw new Error('Invalid duration');
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}h ${mins}m ${secs}s`;
}

/**
 * Retrieves user profile by ID.
 * @param userId - The ID of the user.
 * @param profiles - Array of user profiles.
 * @returns UserProfile object or null if not found.
 */
export function getUserProfile(userId: string, profiles: UserProfile[]): UserProfile | null {
  if (typeof userId !== 'string') throw new Error('Invalid user ID');
  if (!Array.isArray(profiles)) throw new Error('Invalid profiles array');
  return profiles.find(profile => profile.id === userId) || null;
}

/**
 * Adds a new meditation session to a user's profile.
 * @param userId - The ID of the user.
 * @param session - The meditation session to add.
 * @param profiles - Array of user profiles.
 * @returns Updated array of user profiles.
 */
export function addMeditationSession(userId: string, session: MeditationSession, profiles: UserProfile[]): UserProfile[] {
  if (typeof userId !== 'string') throw new Error('Invalid user ID');
  if (typeof session !== 'object' || !session) throw new Error('Invalid session');
  if (!Array.isArray(profiles)) throw new Error('Invalid profiles array');

  return profiles.map(profile => {
    if (profile.id === userId) {
      return { ...profile, sessions: [...profile.sessions, session] };
    }
    return profile;
  });
}

/**
 * Generates a unique ID for a new meditation session.
 * @returns A unique string ID.
 */
export function generateSessionId(): string {
  return `session_${Math.random().toString(36).substr(2, 9)}`;
}

export {
  LucideIcon
};