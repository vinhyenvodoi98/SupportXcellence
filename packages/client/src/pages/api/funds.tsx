import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "hello" });
}
