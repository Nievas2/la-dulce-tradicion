import Body from "../(components)/Body"
import SideNav from "./(components)/sideNav"

const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos1.jpg')] w-full max-w-8xl min-h-screen">
      <div className="flex w-full h-full flex-row relative">
        <div className="">

        <SideNav />
        </div>

        <div className="p-6 md:overflow-y-hidden md:p-8 w-full">{children}</div>
      </div>
    </div>
  )
}
export default layout
