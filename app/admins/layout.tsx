import Body from "../(components)/Body"
import SideNav from "./(components)/sideNav"

const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos1.jpg')] w-full max-w-8xl min-h-scr">
      <div className="flex w-full flex-row overflow-hidden">
        <div className="flex-none md:w-64">
          <SideNav />
        </div>
        <div className="p-6 md:overflow-y-hidden md:p-8 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
export default layout
