import { NextResponse } from "next/server"
import db from "../../db"
import { Category } from "@/interfaces/Category"
import { SubCategory } from "@/interfaces/SubCategory"

interface Product {
  id: number
  name: string
  price: number // Cambia el tipo según sea necesario
}
const ITEMS_PER_PAGE = 6
interface adminProp {
  admin: number
}
export async function checkAdmins(email: string): Promise<any> {
  try {
    const response = new Promise((resolve, reject) => {
      db.query(
        `SELECT admin FROM ${process.env.NEXT_PUBLIC_DB_DATABASE}.Users WHERE email = ?`,
        [email],
        (err, results) => {
          if (err) {
            return reject(err)
          }
          if (Array.isArray(results)) {
            resolve(results[0]) // Asegúrate de que sea del tipo correcto
          } else {
            reject(new Error("El resultado no es un array"))
          }
        }
      )
    })
    return response
  } catch (error) {
    throw error
  }
}

export async function getProductsPrice(
  query: string,
  currentPage: number,
  categoryId: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const results = await new Promise<Product[]>((resolve, reject) => {
      let sqlQuery = `
        SELECT id, name, price FROM Products
      `

      const conditions = []
      if (query) {
        conditions.push(`name LIKE '%${query}%'`)
      }
      if (categoryId) {
        conditions.push(`CategoryId = ${categoryId}`)
      }

      if (conditions.length > 0) {
        sqlQuery += ` WHERE ${conditions.join(" AND ")}`
      }

      sqlQuery += ` LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`

      db.query(sqlQuery, (err, results) => {
        if (err) {
          return reject(err)
        }

        // Verifica si results es un array
        if (Array.isArray(results)) {
          resolve(results as Product[]) // Asegúrate de que sea del tipo correcto
        } else {
          reject(new Error("Unexpected result format"))
        }
      })
    })

    return results
  } catch (error) {
    console.error("Error fetching product prices:", error)
    throw error
  }
}

export async function getSubCategoriesPrice(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE
  try {
    let sqlQuery = `
        SELECT p.id as productId, p.name as productName, sc.id as subCategoryId, sc.date as subCategoryDate, sc.price as subCategoryPrice
        FROM SubCategoryProducts scp
        JOIN Products p ON scp.ProductId = p.id
        JOIN SubCategories sc ON scp.SubCategoryId = sc.id
    `
    if (query) {
      sqlQuery += ` WHERE sc.date LIKE '%${query}%'`
    }

    sqlQuery += ` LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`

    const results = await new Promise<any[]>((resolve, reject) => {
      db.query(sqlQuery, (err, results) => {
        if (err) {
          return reject(err)
        }
        resolve(results as any[])
      })
    })

    // Agrupar las subcategorías por producto
    const groupedResults = results.reduce((acc, curr) => {
      const { productId, productName, subCategoryId, subCategoryDate, subCategoryPrice } = curr
      if (!acc[productId]) {
        acc[productId] = {
          productId,
          productName,
          subCategories: []
        }
      }
      acc[productId].subCategories.push({
        subCategoryId,
        subCategoryDate,
        subCategoryPrice
      })
      return acc
    }, {})

    return Object.values(groupedResults)
  } catch (error) {
    throw error
  }
}

export async function getPagesPrice(query: string, categoryId: string) {
  try {
    const results = await new Promise<any[]>((resolve, reject) => {
      db.query(
        `SELECT id FROM Products ${
          categoryId ? `WHERE CategoryId = ${categoryId}` : ""
        }`,
        (err, results) => {
          if (err) {
            return reject(err)
          }

          // Verifica si results es un array
          if (Array.isArray(results)) {
            resolve(results as any[]) // Asegúrate de que sea del tipo correcto
          } else {
            reject(new Error("El resultado no es un array"))
          }
        }
      )
    })
    const totalPages = Math.ceil(Number(results.length) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch total number of invoices.")
  }
}

export async function getPagesPriceSubCategories(query: string) {
  try {
    const results = await new Promise<any[]>((resolve, reject) => {
      db.query(
        `SELECT id FROM SubCategories ${query ? `WHERE date = ${query}` : ""}`,
        (err, results) => {
          if (err) {
            return reject(err)
          }
          // Verifica si results es un array
          if (Array.isArray(results)) {
            resolve(results as any[]) // Asegúrate de que sea del tipo correcto
          } else {
            reject(new Error("El resultado no es un array"))
          }
        }
      )
    })
    const totalPages = Math.ceil(Number(results.length) / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    throw error
  }
}

export async function updatePrice(id: number, price: number, email: string) {
  try {
    const checkAdmin = await checkAdmins(email)
    if (checkAdmin!.admin === 1) {
      const response = new Promise((resolve, reject) => {
        db.query(
          `UPDATE ${process.env.NEXT_PUBLIC_DB_DATABASE}.Products SET price = ${price} WHERE id = ${id}`,
          (err, results) => {
            if (err) {
              return reject(err)
            }
            resolve(results)
          }
        )
      })
      return response
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function updatePriceSubCategory(
  id: number,
  price: number,
  email: string
) {
  try {
    const checkAdmin = await checkAdmins(email)
    if (checkAdmin!.admin === 1) {
      const response = new Promise((resolve, reject) => {
        db.query(
          `UPDATE ${process.env.NEXT_PUBLIC_DB_DATABASE}.SubCategories SET price = ${price} WHERE id = ${id}`,
          (err, results) => {
            if (err) {
              return reject(err)
            }
            resolve(results)
          }
        )
      })
      return response
    }
    return false
  } catch (error) {
    throw error
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${process.env.NEXT_PUBLIC_DB_DATABASE}.Categories`,

        (err, results) => {
          if (err) {
            return reject(err)
          }
          if (Array.isArray(results)) {
            resolve(results as Category[]) // Asegúrate de que sea del tipo correcto
          } else {
            reject(new Error("El resultado no es un array"))
          }
        }
      )
    })
    return response as Promise<Category[]>
  } catch (error) {
    throw error
  }
}
