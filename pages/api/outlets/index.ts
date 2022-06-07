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
    
    if (req.method !== 'POST') {
      res.status(405).json({ messages: 'Only POST requests allowed' })
      return
    }

    const body = req.body

    try {
      let new_outlets = await axios.post(process.env.API_URL + "outlet/outlets/", body, {
        headers: {
          'Authorization': `Bearer ${session.accessToken}` 
        }
      })
    } catch (error) {
      console.log(error);
      
    }
    

  res.status(200).json({ messages: "success" })
}
