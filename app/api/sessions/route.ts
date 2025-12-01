import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import Cors from 'cors';

const prisma = new PrismaClient();

const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  switch (req.method) {
    case 'GET':
      try {
        const sessions = await prisma.session.findMany();
        res.status(200).json(sessions);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sessions' });
      }
      break;
    case 'POST':
      try {
        const { userId, duration, date } = req.body;
        if (!userId || !duration || !date) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        const session = await prisma.session.create({
          data: {
            userId,
            duration,
            date: new Date(date),
          },
        });
        res.status(201).json(session);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create session' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}