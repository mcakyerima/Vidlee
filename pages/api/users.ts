// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';
import {allUsersQuery} from '../../utils/queries'

type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    
  if(req.method === 'GET') {
    const  data  = await client.fetch(allUsersQuery());
    if( data ) {
        res.status(200).json(data);
        console.log("users query" , data)
    }else {
      
        res.json([])
    }
  }
}
