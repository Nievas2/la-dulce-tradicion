import { Producto } from "@/interfaces/Product"
const Cards = (producto: Producto) => {
  return (
    <div>
      <div className="flex flex-col bg-main">
        <div className="">
          <div className="border border-tertiary">
            <a className="text-black">
              <div className="absolute right-1 z-10"></div>

              <img
                src={producto.image}
                className="w-full h-48 object-cover"
                alt={producto.name}
              />

              <div className="card-body item-info">
                <h3 className="fs-5">
                  <b>{producto.name}</b>
                </h3>

                <h4 className="text-lg text-end">${producto.price}</h4>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cards
