import Link from "next/link"
interface SideItemProps {
  name: string
  link: string
}
const SideItem = ({ name, link }: SideItemProps) => {
  return (
    <>
      <Link
        className="hidden md:flex w-full h-full p-2 rounded-lg border text-black hover:text-white border-secondary hover:bg-secondary/80 cursor-pointer transition-colors duration-300"
        href={link}
      >
        {name}
      </Link>
      <Link
        className="p-2 rounded-lg border border-secondary flex md:hidden items-center justify-center"
        href={link}
      >
        X
      </Link>
    </>
  )
}
export default SideItem
