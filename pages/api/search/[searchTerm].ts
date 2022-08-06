// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { searchPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';


type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    
  if(req.method === 'GET') {
    const { searchTerm } = req.query

    const videoQuery = searchPostsQuery(searchTerm);

    // fetch the video using  client
    const videos = await client.fetch(videoQuery);

    res.status(200).json(videos);


  }
}
