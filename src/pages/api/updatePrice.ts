// pages/api/updatePrice.ts
import { updatePrice } from "@/services/PriceService"
import { NextApiRequest, NextApiResponse } from "next"// Asegúrate de importar correctamente

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const { id, price, email } = req.body

    try {
      
      const result = await updatePrice(id, price, email)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.setHeader("Allow", ["PUT"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
