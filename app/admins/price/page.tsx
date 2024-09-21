"use client"
import { useRouter } from "next/router";
import Prices from "./(componets)/Prices"

const page = async () => {
  const router = useRouter();
  const { categoryId } = router.query;
  return (
    <div>
      <Prices categoryId={categoryId ? Number(categoryId) : undefined}/>
    </div>
  )
}
export default page
