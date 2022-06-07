// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'


type Data = {
  messages: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const session = await getSession({req})
    
    if (req.method !== 'DELETE') {
      res.status(405).json({ messages: 'Only DELETE requests allowed' })
      return
    }
    const body = req.body
    const { outletId } = req.query

    try {
      let edit = await axios.delete(process.env.API_URL + "outlet/outlets/" + outletId + "/", {
        headers: {
          'Authorization': `Bearer ${session.accessToken}` 
        }
      })
    } catch (error) {
      console.log(error);
    }
    

  res.status(200).json({ messages: "success" })
}
