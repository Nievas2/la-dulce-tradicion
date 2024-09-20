import SideItem from "./SideItem"

const SideNav = () => {
  return (
    <div className="bg-main h-full w-full min-h-screen">
      <ul className="flex flex-col p-2 gap-3 ">
       <SideItem icon="clarity:dollar-solid" name="Precios" link="/admins/precios" />
        <SideItem icon="mingcute:chicken-fill" name="Productos" link="/admins/products" />
        <SideItem icon="mdi:tag-outline" name="Categorias" link="/admins/categories" />
        <SideItem icon="ph:tag-chevron-fill" name="Sub Categorias" link="/admins/subcategories" />
        <SideItem icon="mdi:image-multiple-outline" name="Imagenes" link="/admins/imageproduct" />
      </ul>
    </div>
  )
}
export default SideNav
