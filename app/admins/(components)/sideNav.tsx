import Link from "next/link"
import SideItem from "./SideItem"

const SideNav = () => {
  return (
    <div className="bg-main h-full w-full">
      <ul className="flex flex-col p-2 gap-3 ">
        <SideItem name="Products" link="/admins/products" />
        <SideItem name="Categories" link="/admins/categories" />
        <SideItem name="Users" link="/admins/users" />
        <SideItem name="SubCategories" link="/admins/subcategories" />
        <SideItem name="Imagen de los productos" link="/admins/imageproduct" />
        <SideItem name="Admins" link="/admins/admins" />
      </ul>
    </div>
  )
}
export default SideNav
