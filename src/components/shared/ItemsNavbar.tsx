export interface ItemsNavbarProps {
  link: string
  name: string
  pathname: string
  className?: string
}
const ItemsNavbar = ({ link, name, pathname, className }: ItemsNavbarProps) => {
  return (
    <a
      href={link}
      className={`rounded-md px-3 py-2 text-sm font-medium relative group transition-all duration-300 ${
        pathname !== link ? "text-black md:hover:text-secondary" : "text-secondary font-bold md:hover:text-black" 
      }` + className}
    >
      {name}
      <span
        className={`h-[3px] inline-block bg-transparent md:bg-secondary absolute left-1/2 -translate-x-1/2 bottom-[1px] transition-[width] ease duration-300 ${
          pathname === link ? "w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </a>
  )
}
export default ItemsNavbar
