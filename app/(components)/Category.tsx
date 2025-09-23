import Link from "next/link"

interface CategoryProps {
  img: string
  title: string
  link: string
  className?: string
}
const Category = ({ img, title, link, className }: CategoryProps) => {
  return (
    <div
      className={`flex items-center justify-center text-white w-full h-40 relative group ${
        className ? className : "col-span-full lg:col-span-1"
      } relative`}
    >
      <Link
        href={link}
        className={`hidden sm:flex items-center justify-center w-fit h-fit p-4 rounded-full bg-secondary border-red-main absolute left-[10%] md:left-[12%] ${
          className ? "lg:left-[10%] " : "lg:-left-5 xl:left-10"
        } shadow-lg duration-200 transition-transform group-hover:scale-110 z-40`}
      >
        <img src={img} alt={title} className="size-28" />
      </Link>

      <Link
        href={link}
        className={`flex items-center justify-center gap-2 bg-secondary h-20 rounded-3xl shadow-lg duration-200 transition-transform group-hover:scale-105 w-full sm:w-4/6 px-1
        }`}
      >
        {/* <div className="flex items-center justify-center gap-2 bg-secondary w-64 -ml-8 h-20 rounded-r-3xl shadow-lg"> */}
        <p className="text-2xl text-center font-bold uppercase">{title}</p>
      </Link>
    </div>
  )
}
export default Category
