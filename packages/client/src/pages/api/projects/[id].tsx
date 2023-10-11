import { connectToDatabase } from '@/utils/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (req.method === 'GET') {
      // GET /api/users/:id

      res.status(200).json({ message: `GET user with ID ${id}` });
    } else if (req.method === 'PUT') {
      // PUT /api/users/:id

      res.status(200).json({ message: `UPDATE user with ID ${id}` });
    } else if (req.method === 'DELETE') {
      // DELETE /api/users/:id
      res.status(200).json({ message: `DELETE user with ID ${id}` });
    } else {

      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error:any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}
