import handler from "@/services/PriceService"
import getProductsPrice from "@/services/PriceService"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import Prices from "./(componets)/Prices"

const page = async () => {
  /* const { data } = useQuery({
    queryKey: ["price"],
    queryFn: handler,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24
  }) */
  /*   let response  
  await getProductsPrice().then((data) => response = data) */

  return (
    <div>
      <Prices />
    </div>
  )
}
export default page
