import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ImageProduct } from "@/interfaces/ImageProduct"
import { Icon } from "@iconify/react/dist/iconify.js"
import ChangeImageProduct from "./ChangeImageProduct"

interface ImageCardProps {
  image: ImageProduct
}
const ImageCard = ({ image }: ImageCardProps) => {
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
          image.image != null || image.image != undefined
            ? image.image
            : "/fondos/fondos1.jpg"
        })`,
      }}
    >
      <span className="absolute bottom-2 left-2 text-white bg-secondary rounded-full px-2 line-clamp-1">
        {image.id}
      </span>
      <Dialog>
        <DialogTrigger className="absolute top-2 right-2 p-2 bg-secondary rounded-full line-clamp-1">
          <Icon
            icon="fluent:edit-24-filled"
            width="24"
            height="24"
            color="#fff"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar una imagen</DialogTitle>
            <ChangeImageProduct
              Product={undefined}
              image={image.image}
              imageId={image.id}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <button className="absolute bottom-2 right-2 p-2 bg-red-500 rounded-full  line-clamp-1">
        <Icon
          icon="fluent:delete-24-filled"
          width="24"
          height="24"
          color="white"
        />
      </button>
    </div>
  )
}
export default ImageCard
