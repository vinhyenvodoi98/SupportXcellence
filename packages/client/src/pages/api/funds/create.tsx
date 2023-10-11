import { connectToDatabase } from '@/utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      // POST /api/users
      res.status(200).json({ message: 'Create a new user' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error:any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
