const layout = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div>
      <title>La dulce tradicion | productos</title>
      {children}
    </div>
  )
}
export default layout