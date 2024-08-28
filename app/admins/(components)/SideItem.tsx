import Link from "next/link"
interface SideItemProps {
  name: string
  link: string
}
const SideItem = ({ name, link }: SideItemProps) => {
  return (
    <li className="p-2 rounded-lg border text-black hover:text-white border-secondary hover:bg-secondary/80 cursor-pointer transition-colors duration-300">
      <Link
        className="w-full h-full"
        href={link}
      >
        {name}
      </Link>
    </li>
  )
}
export default SideItem
