import { NextResponse } from "next/server"
import db from "../../db"

interface Product {
  name: string
  price: number // Cambia el tipo según sea necesario
}

export default async function getProductsPrice(): Promise<Product[]> {
  try {
    const results = await new Promise<Product[]>((resolve, reject) => {
      db.query("SELECT name, price FROM Products", (err, results) => {
        if (err) {
          return reject(err)
        }

        // Verifica si results es un array
        if (Array.isArray(results)) {
          resolve(results as Product[]) // Asegúrate de que sea del tipo correcto
        } else {
          reject(new Error("El resultado no es un array"))
        }
      })
    })

    return results
  } catch (error) {
    console.error("Error fetching product prices:", error) // Log del error
    throw error
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
