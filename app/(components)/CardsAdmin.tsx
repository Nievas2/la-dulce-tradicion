import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Producto } from "@/interfaces/Product"
import { Icon } from "@iconify/react/dist/iconify.js"
import ChangeProduct from "../admins/products/(components)/ChangeProduct"
interface CardProps {
  product: Producto
}
const CardsAdmin = ({ product }: CardProps) => {
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
      style={{ backgroundImage: `url(${product.image})` }}
    >
      <span className="text-white">{product.name}</span>
      <span  className="absolute bottom-2 left-2 text-white">{product.id}</span>
      <Dialog>
        <DialogTrigger className="absolute top-2 right-2">
          <Icon
            icon="fluent:edit-24-filled"
            width="24"
            height="24"
            color="#fff"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar un producto</DialogTitle>
            <ChangeProduct product={product} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <button className="absolute bottom-2 right-2">
        <Icon
          icon="fluent:delete-24-filled"
          width="24"
          height="24"
          color="#f00"
        />
      </button>
    </div>
  )
}
export default CardsAdmin
