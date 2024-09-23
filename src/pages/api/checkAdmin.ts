import { checkAdmins } from "@/services/PriceService"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { email } = req.query
    if (!email) return res.status(400).json({ message: "Missing id" })
    try {
      const result = await checkAdmins(email.toString())          
      res.status(200).json({ admin: result })
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
