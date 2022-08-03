import { NextApiRequest , NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { singleUserQuery, userCreatedPostsQuery , userLikedPostsQuery } from '../../../utils/queries';

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const {id}: any = req.query;
        const userPostQuery = userCreatedPostsQuery(id);
        const userLikesQuery = userLikedPostsQuery(id)
        const query = singleUserQuery(id)
        const user = await client.fetch(query)
        const userPosts = await client.fetch(userPostQuery);
        const userLikes = await client.fetch(userLikesQuery);

        res.status(200).json({user: user[0], userPosts, userLikes})
    }
}