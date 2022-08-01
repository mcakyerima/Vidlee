import { uuid } from 'uuidv4';
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
    const { id }: any = req.query;
    const query = postDetailQuery(id)
    const data = await client.fetch(query)

    res.status(200).json(data[0]);
  } else if (req.method === 'PUT') {
    const { comment , userId } = req.body;
    const { id }: any = req.query;

    // puting the comment 
    const data = await client
    .patch(id)
    .setIfMissing({comments: []})
    .insert('after', 'comments[-1]', [
      {
        comment,
        _key: uuid(),
        postedBy: { _type: 'postedBy' , _ref: userId}
      }
    ])
    .commit()

    // get back the comments
    res.status(200).json(data)
    console.log('data from api ' , data.comments)
  }
}
