import SideItem from "./SideItem"

const SideNav = () => {
  return (
    <div className="bg-main h-full w-full min-h-screen">
      <ul className="flex flex-col p-2 gap-3 ">
        <SideItem icon="mingcute:chicken-fill" name="Products" link="/admins/products" />
        <SideItem icon="mdi:tag-outline" name="Categories" link="/admins/categories" />
        <SideItem icon="ph:tag-chevron-fill" name="SubCategories" link="/admins/subcategories" />
        <SideItem icon="mdi:image-multiple-outline" name="Imagen de los productos" link="/admins/imageproduct" />
        <SideItem icon="ri:admin-fill" name="Admins" link="/admins/admins" />
      </ul>
    </div>
  )
}
export default SideNav
