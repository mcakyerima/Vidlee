// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';


type Data = {
  name: string
}

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    // our method is eqaual to get method cuz we are fetching all post from users
    // so we are going to make a query to sanity backend and get all the videos from
    // using our allPostQuery query function inside utility folder
  if(req.method === 'POST') {
    const user  = req.body
// call sanity client and create a user if the user does not exist
    client.createIfNotExists(user)
    .then(()=> res.status(200).json("Login Success"))
  }
}
