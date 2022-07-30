// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { postDetailQuery } from '../../../utils/queries';



type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    // we are accepting the clicked video id through the get method parameter [id]
    // and then making a query to sanity backend for that specific video
    
  if(req.method === 'GET') {
    const { id } = req.query;
    const query = postDetailQuery(id)
    const data = await client.fetch(query)

    res.status(200).json(data[0]);
  }
}
