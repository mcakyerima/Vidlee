// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { allPostsQuery } from '../../../utils/queries'

type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    // our method is eqaual to get method cuz we are fetching all post from users
    // so we are going to make a query to sanity backend and get all the videos from
    // using our allPostQuery query function inside utility folder
  if(req.method === 'GET') {
    const query = allPostsQuery();
    const data = await client.fetch(query )
    
    res.status(200).json(data)
  } 
  // if method is post.. which we are expecting from video upload
  // then we accept and the document and create the video using the 
  // client.create and pass in the document
  else if(req.method === "POST") {
    const document = req.body
    client.create(document)

    .then(() => res.status(201).json('video successfully uploaded'))
  }
}
