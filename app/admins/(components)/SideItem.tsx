import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
interface SideItemProps {
  name: string
  link: string
  icon: string
}
const SideItem = ({ name, link, icon }: SideItemProps) => {
  return (
    <>
      <Link
        className="hidden md:flex w-full h-full p-2 gap-2 rounded-lg border text-black hover:text-white border-secondary hover:bg-secondary/80 cursor-pointer transition-colors duration-300"
        href={link}
      >
        <Icon icon={icon} width="24" height="24" />
        {name}
      </Link>
      <Link
        className="p-2 rounded-lg border border-secondary flex md:hidden items-center justify-center"
        href={link}
      >
        <Icon icon={icon} width="24" height="24" />
      </Link>
    </>
  )
}
export default SideItem
