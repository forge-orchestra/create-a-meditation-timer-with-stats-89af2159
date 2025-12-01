import { PrismaClient } from '@prisma/client';

/**
 * Initializes and configures the Prisma Client.
 * @returns {PrismaClient} Configured Prisma Client instance.
 */
function initializePrismaClient(): PrismaClient {
  try {
    const prisma = new PrismaClient();
    return prisma;
  } catch (error) {
    console.error('Failed to initialize Prisma Client:', error);
    throw new Error('Prisma Client initialization error');
  }
}

/**
 * Retrieves user profile by ID.
 * @param {PrismaClient} prisma - The Prisma Client instance.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<User | null>} The user profile or null if not found.
 */
async function getUserProfile(prisma: PrismaClient, userId: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    throw new Error('Failed to retrieve user profile');
  }
}

/**
 * Logs a meditation session for a user.
 * @param {PrismaClient} prisma - The Prisma Client instance.
 * @param {string} userId - The ID of the user.
 * @param {number} duration - The duration of the meditation session in minutes.
 * @returns {Promise<MeditationSession>} The logged meditation session.
 */
async function logMeditationSession(prisma: PrismaClient, userId: string, duration: number): Promise<MeditationSession> {
  try {
    const session = await prisma.meditationSession.create({
      data: {
        userId,
        duration,
        timestamp: new Date(),
      },
    });
    return session;
  } catch (error) {
    console.error('Error logging meditation session:', error);
    throw new Error('Failed to log meditation session');
  }
}

/**
 * Retrieves all meditation sessions for a user.
 * @param {PrismaClient} prisma - The Prisma Client instance.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<MeditationSession[]>} List of meditation sessions.
 */
async function getMeditationSessions(prisma: PrismaClient, userId: string): Promise<MeditationSession[]> {
  try {
    const sessions = await prisma.meditationSession.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });
    return sessions;
  } catch (error) {
    console.error('Error retrieving meditation sessions:', error);
    throw new Error('Failed to retrieve meditation sessions');
  }
}

export {
  initializePrismaClient,
  getUserProfile,
  logMeditationSession,
  getMeditationSessions,
};