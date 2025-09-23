import Category from "./Category"

const CategoriesSection = () => {
  return (
    <section className="flex flex-col gap-10 min-h-screen pt-8 bg-main">
      <h2 className="text-4xl font-bold text-center">
        CATEGORIAS QUE QUEREMOS RECOMENDARTE
      </h2>

      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-y-2 md:gap-y-8 w-full place-content-center place-items-center items-center justify-center`}
      >
        {/* 
        pasteleria
        lunch
        perniles
        tortas
        agregados y especiales
        combos
        eventos y servicios
        #fdf5f2
        */}
        <Category
          title="Pasteleria"
          img="/fondos/categories/1.webp"
          link="/productos?page=1&categoryId=1"
        />
        <Category
          title="Lunch"
          img="/fondos/categories/2.webp"
          link="/productos?page=1&categoryId=2"
        />
        <Category
          title="Perniles y carnes"
          img="/fondos/categories/3.webp"
          link="/productos?page=1&categoryId=3"
        />
        <Category
          title="Tortas"
          img="/fondos/categories/4.webp"
          link="/productos?page=1&categoryId=4"
        />
        <Category
          title="Agregados y Especiales"
          img="/fondos/categories/5.webp"
          link="/productos?page=1&categoryId=5"
        />
        <Category
          title="Combos"
          img="/fondos/categories/6.webp"
          link="/productos?page=1&categoryId=5"
        />

        <Category
          title="Eventos y servicios"
          img="/fondos/categories/7.webp"
          link="/productos?page=1&categoryId=5"
          className="col-span-full"
        />
      </div>
    </section>
  )
}

export default CategoriesSection
