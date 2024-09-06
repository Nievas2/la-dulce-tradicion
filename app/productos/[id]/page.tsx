"use client"
import Cards from "@/components/shared/Cards"
import axios from "axios"
import { useEffect } from "react"
const page = () => {
  const productos = [
    {
      id: 1,
      name: "Camiseta de algodón",
      description:
        "Camiseta básica de algodón de alta calidad, suave y cómoda para uso diario.",
      price: 19.99,
      image: "camiseta-algodon.jpg",
      CategoryName: "Ropa",
      SubCategoryProducts: [
        {
          id: 1,
          ProductId: 1,
          SubCategoryId: 1,
          SubCategory: {
            id: 1,
            date: "2023-08-15",
            price: 19.99,
            Product: 1
          }
        }
      ],
      ImagesProductAsocciations: [
        {
          id: 1,
          ImageProductId: 1,
          ProductId: 1,
          ImageProduct: {
            id: 1,
            image: "camiseta-algodon.jpg",
            Product: 1
          }
        }
      ]
    },
    {
      id: 2,
      name: "Smartphone Android",
      description:
        "Smartphone Android de última generación con cámara de alta resolución y gran capacidad de almacenamiento.",
      price: 399.99,
      image: "smartphone-android.jpg",
      CategoryName: "Electrónica",
      SubCategoryProducts: [
        {
          id: 2,
          ProductId: 2,
          SubCategoryId: 2,
          SubCategory: {
            id: 2,
            date: "2023-08-15",
            price: 399.99,
            Product: 2
          }
        }
      ],
      ImagesProductAsocciations: [
        {
          id: 2,
          ImageProductId: 2,
          ProductId: 2,
          ImageProduct: {
            id: 2,
            image: "smartphone-android.jpg",
            Product: 2
          }
        }
      ]
    }
  ]
  useEffect(() => {
     getProducts() 
  },[])
  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:4001/producto/get/1")
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section>
      {/*   {productos.map((producto) => (
        <Cards
          producto={producto}
          key={crypto.randomUUID()}
        />
      ))} */}
    </section>
  )
}
export default page
