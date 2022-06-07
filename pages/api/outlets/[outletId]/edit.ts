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
    
    if (req.method !== 'PUT') {
      res.status(405).json({ messages: 'Only PUT requests allowed' })
      return
    }
    const body = req.body
    const { outletId } = req.query

    try {
      let edit = await axios.put(process.env.API_URL + "outlet/outlets/" + outletId + "/", body, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}` 
        }
      })
    } catch (error) {
      console.log(error);
    }
    

  res.status(200).json({ messages: "success" })
}
