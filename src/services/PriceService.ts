import { NextResponse } from "next/server"
import db from "../../db"

export default async function getProductsPrice() {
  try {
    const results = await new Promise((resolve: any, reject: any) => {
      db.query("SELECT name, price FROM products", (err: any, results: any) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
    return results
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
export async function updatePrice(request: Request) {
  const { name, newPrice } = await request.json()

  if (!name || typeof newPrice !== "number") {
    return NextResponse.json(
      { message: "Nombre y precio son requeridos." },
      { status: 400 }
    )
  }

  try {
    await new Promise((resolve, reject) => {
      db.query(
        "UPDATE product SET price = ? WHERE name = ?",
        [newPrice, name],
        (err: any) => {
          if (err) {
            console.error("Error al actualizar el precio:", err)
            return reject(err)
          }
          resolve(null)
        }
      )
    })

    return NextResponse.json({ message: "Precio actualizado con éxito." })
  } catch (error) {
    console.error("Error en la actualización:", error)
    return NextResponse.json(
      { message: "Error al actualizar el precio", error },
      { status: 500 }
    )
  }
}
