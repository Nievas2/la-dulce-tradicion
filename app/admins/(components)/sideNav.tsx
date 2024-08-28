import Link from "next/link"
import SideItem from "./SideItem"

const SideNav = () => {
  return (
    <div className="bg-main h-full w-full">
      <ul className="flex flex-col p-4 gap-3">
        <SideItem name="Products" link="/admins/products" />
        <SideItem name="Categories" link="/admins/categories" />
        <SideItem name="Users" link="/admins/users" />
      </ul>
    </div>
  )
}
export default SideNav
