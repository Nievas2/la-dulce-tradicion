import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCard = () => {
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-b-lg px-2 py-2 gap-4 shadow-md relative">
      <Skeleton className="rounded-lg w-full h-48 bg-gray-200" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-8 w-2/4 rounded-md" />
        <Skeleton className="h-6 w-1/4 rounded-md" />

        </div>
        <Skeleton className="h-10 w-6/6 rounded-md" />
        
      </div>
    </div>
  )
}

export const renderSkeletonProducts = () => {
  return (
    <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-x-6 gap-y-3 xl:gap-8">
      {Array.from({ length: 8 }).map((_) => (
        <SkeletonCard key={crypto.randomUUID()} />
      ))}
    </div>
  )
}
