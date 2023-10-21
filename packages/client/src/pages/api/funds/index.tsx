import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Xử lý GET /api/users
      res.status(200).json({ message: 'GET all users' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
    // const { db } = await connectToDatabase();
    // await db.collection("User").insertOne({ title: 'Jackie Robinson' });
    // res.status(200).json({ name: "hello" });
  } catch (error: any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};
