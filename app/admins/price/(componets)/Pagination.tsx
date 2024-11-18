"use client"

import { generatePagination } from "@/utils/GeneratePagination"
import { Icon } from "@iconify/react/dist/iconify.js"
/* import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; */
import clsx from "clsx"
import Link from "next/link"

import { usePathname, useSearchParams } from "next/navigation"

export default function Pagination({ totalPages }: { totalPages: number }) {
  // NOTE: comment in this code when you get to this point in the course
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams?.get("page")) || 1
  const allPages = generatePagination(currentPage, totalPages)
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams!)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageURL(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />

        <div className="flex gap-2 font-semibold">
          {allPages.map((page: any, index: number) => {
            return (
              <PaginationNumber
                key={page}
                href={createPageURL(page)}
                page={page}
                isActive={currentPage === Number(page)}
              />
            )
          })}
        </div>

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
  isActive,
}: {
  page: number | string
  href: string
  isActive: boolean
}) {
  const className = clsx(
    `rounded-md text-sm px-3 py-1.5 sm:text-base sm:px-3 sm:py-1 flex items-center justify-center bg-main ${
      isActive
        ? "bg-secondary text-white transition-colors duration-300 cursor-not-allowed"
        : "hover:bg-secondary hover:text-white transition-colors duration-300 cursor-pointer"
    }`
  )

  return isActive ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: "left" | "right"
  isDisabled?: boolean
}) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md bg-main",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-secondary hover:text-white transition-colors duration-300":
        !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    }
  )

  const icon =
    direction === "left" ? (
      <Icon
        icon="weui:arrow-filled"
        width="24"
        height="24"
        className="rotate-180"
      />
    ) : (
      <Icon icon="weui:arrow-filled" width="24" height="24" />
    )

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  )
}
