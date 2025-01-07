import Link from "next/link"

interface CategoryProps {
  img: string
  title: string
  link: string
  className?: string
}
const Category = ({ img, title, link, className }: CategoryProps) => {
  return (
    <div className={`flex items-center justify-center text-white w-full h-40 relative group ${className}`}>
      <Link
        href={link}
        className={`flex items-center justify-center w-fit h-fit p-8 rounded-full bg-secondary border-red-main absolute ${className ? "left-[250px]":"left-0"} shadow-lg duration-200 transition-transform group-hover:scale-110 z-40`}
      >
        <img src={img} alt={title} className="size-28" />
      </Link>

      <Link
        href={link}
        className={`flex items-center justify-center gap-2 bg-secondary w-4/6 h-20 rounded-3xl shadow-lg duration-200 transition-transform group-hover:scale-105  ${className ? " w-5/12":" w-4/6"}`}
      >
        {/* <div className="flex items-center justify-center gap-2 bg-secondary w-64 -ml-8 h-20 rounded-r-3xl shadow-lg"> */}
        <p className="text-xl font-bold uppercase">{title}</p>
      </Link>
    </div>
  )
}
export default Category
