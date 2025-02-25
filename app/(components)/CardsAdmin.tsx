import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Product } from "@/interfaces/Product"
import { Icon } from "@iconify/react/dist/iconify.js"
import ChangeProduct from "../admins/products/(components)/ChangeProduct"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { deleteProduct } from "@/services/ProductService"
interface CardProps {
  product: Product
}
const CardsAdmin = ({ product }: CardProps) => {
  const { mutate, isSuccess } = useMutation({
    mutationKey: ["products"],
    mutationFn: () => {
      return deleteProduct(product.id)
    },
    onError: (error) => {
      console.log(error)
    },
  })
  const handleDelete = () => {
    mutate()
  }
  return (
    <div
      className={`
        flex flex-col items-start justify-start 
        bg-cover bg-center 
        h-[150px] w-[300px] 
        p-2 
        rounded-lg
        relative
        `}
      style={{
        backgroundImage: `url(${
          product.ImagesProductAsocciations[0] != null ||
          product.ImagesProductAsocciations[0] != undefined
            ? product.ImagesProductAsocciations[0].ImageProduct.image
            : "/fondos/fondos1.jpg"
        })`,
      }}
      /* backgroundImage: `url(${product.ImagesProductAsocciations[0].ImageProduct.image})` */
    >
      <span className="text-white bg-secondary rounded-full px-2 line-clamp-1">
        {product.name}
      </span>

      <span className="absolute bottom-2 left-2 text-white bg-secondary rounded-full px-2 line-clamp-1">
        id: {product.id}
      </span>

      <Dialog>
        <DialogTrigger className="absolute top-2 right-2">
          <Icon
            icon="fluent:edit-24-filled"
            width="32"
            height="32"
            color="#fff"
            className="p-2 rounded-full bg-secondary"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar un producto</DialogTitle>
            <ChangeProduct product={product} />
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {isSuccess ? (
        <small className="absolute bottom-2 right-2 text-white bg-green-600 rounded-full px-2">
          Producto eliminado
        </small>
      ) : (
        <Dialog>
          <DialogTrigger className="absolute bottom-2 right-2">
            <Icon
              icon="fluent:delete-24-filled"
              width="32"
              height="32"
              color="#fff"
              className="p-2 rounded-full bg-red-500"
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar un producto</DialogTitle>
              <p>¿Estás seguro que deseas eliminar este producto?</p>
              <div className="flex justify-between gap-4">
                <DialogClose>
                  <Button variant="main">Cancelar</Button>
                </DialogClose>
                <Button variant="destructive" onClick={handleDelete}>
                  Eliminar
                </Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
export default CardsAdmin
