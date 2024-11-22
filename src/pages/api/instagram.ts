import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { INSTAGRAM_ACCESS_TOKEN } = process.env

  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,like_count,media_url,thumbnail_url,permalink&limit=3&access_token=${INSTAGRAM_ACCESS_TOKEN}`

  try {
    const response = await axios.get(url)
    const data = response.data.data
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching Instagram posts:", error)
    res.status(500).json({ error: "Failed to fetch Instagram posts" })
  }
}
