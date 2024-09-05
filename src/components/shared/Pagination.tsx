"use client"

import { Producto } from "@/interfaces/Product"
/* import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; */
import clsx from "clsx"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export default function Pagination({
  totalPages,
  disabled,
  products
}: {
  totalPages: number
  disabled: boolean
  products: Producto[]
}) {
  // NOTE: comment in this code when you get to this point in the course
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams!.get("page")) || 1
  /* const allPages = generatePagination(currentPage, totalPages); */
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams()
    if (currentPage >= 1 && currentPage <= totalPages) {
      params.set("page", pageNumber.toString())
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
    const query = searchParams!.get("query") || ""
    return `${pathname}?${"page=" + params?.get("page") + "&query=" + query}`
  }
  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationNumber
          key={crypto.randomUUID()}
          classname={`rounded-md text-sm px-3 py-1.5 sm:text-base sm:px-3 sm:py-1 ${
            i === currentPage
              ? "bg-secondary text-white cursor-not-allowed"
              : "hover:bg-secondary hover:text-white cursor-pointer"
          }`}
          href={createPageURL(i)}
          page={i}
          isActive={i === currentPage || disabled}
        />
      )
    }

    return pageNumbers
  }
  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        <ul className="flex gap-2 font-semibold">{renderPageNumbers()}</ul>
        <PaginationArrow
          direction="right"
          href={createPageURL(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  )
}

function PaginationNumber({
  page,
  href,
  classname,
  isActive
}: {
  page: number | string
  href: string
  classname: string
  isActive: boolean
}) {
  return (
    <>
      {!isActive ? (
        <Link
          href={href}
          className={`${classname} text-center flex justify-center items-center `}
        >
          {page}
        </Link>
      ) : (
        <span
          className={`${classname} text-center flex justify-center items-center `}
        >
          {page}
        </span>
      )}
    </>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled
}: {
  href: string
  direction: "left" | "right"
  isDisabled?: boolean
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right"
    }
  )

  const icon = direction === "left" ? "<" : ">"
  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link
      className={className}
      href={href}
    >
      {icon}
    </Link>
  )
}
