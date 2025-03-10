"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchParams, usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDebouncedCallback } from "use-debounce"

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [text, setText] = useState(searchParams!.get("query")?.toString())

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams?.toString() || "")
    params.set("page", "1")
    if (text) {
      params.set("query", text)
    } else {
      params.delete("query")
    }

    replace(`${pathname}?${params.toString()}`)
  }, 300)

  useEffect(() => {
    handleSearch()
  }, [text])

  return (
    <div className="sticky top-0 flex w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>

      <input
        className="block w-full rounded-md border border-secondary py-[9px] px-2 text-sm font-semibold outline-1 outline-secondary placeholder:font-medium placeholder:text-red-main"
        placeholder={placeholder}
        onChange={(e) => {
          setText(e.target.value)
        }}
        value={text}
      />

      {text && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-0"
          onClick={() => setText("")}
        >
          <Icon
            icon="material-symbols:close"
            className="text-secondary"
            width="24"
            height="24"
          />
        </button>
      )}
    </div>
  )
}
