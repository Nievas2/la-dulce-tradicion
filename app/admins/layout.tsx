import Body from "../(components)/Body"
import SideNav from "./(components)/sideNav"

const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="bg-no-repeat bg-cover bg-center bg-[url('/fondos/fondos1.jpg')] w-full max-w-8xl mt-20 sm:mt-0">
      <div className="flex h-screen w-full flex-row overflow-hidden">
        <div className="flex-none md:w-64">
          <SideNav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 w-full">
          {children}
        </div>
      </div>
    </div>
  )
}
export default layout
