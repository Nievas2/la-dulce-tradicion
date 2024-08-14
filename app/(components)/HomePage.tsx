const HomePage = () => {
  return (
    <div>
      <div className="container-fluid">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li
              className="breadcrumb-item active"
              aria-current="page"
            >
              Home
            </li>
          </ol>
        </nav>
        <div className="row">{/* <app-banners></app-banners> */}</div>
        <div className="row">
          {/* <app-productos-destacados></app-productos-destacados> */}
        </div>
        <div
          className="row"
         /*  style=" margin-bottom: 150px;" */
        >
          {/* <app-preg-frecuentes></app-preg-frecuentes> */}
        </div>
      </div>
    </div>
  )
}
export default HomePage
