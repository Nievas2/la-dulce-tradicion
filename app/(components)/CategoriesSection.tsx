import Category from "./Category"

const CategoriesSection = () => {
  return (
    <section className="flex flex-col gap-10 min-h-screen pt-8 bg-[#ffbfbc]">
      <h2 className="text-4xl font-bold text-center text-white">
        Categorias que queremos recomendarte
      </h2>

      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-y-2 md:gap-y-8 w-full place-content-center place-items-center items-center justify-center`}
      >
        <Category
          title="Pasteleria"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=1"
        />
        <Category
          title="Lunch"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=2"
        />
        <Category
          title="Perniles y carnes"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=3"
        />
        <Category
          title="Tortas"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=4"
        />
        <Category
          title="Agregados y Especiales"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=5"
        />
        <Category
          title="Combos"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=5"
        />

        <Category
          title="Eventos y servicios"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=5"
          className="col-span-full"
        />
      </div>
    </section>
  )
}

export default CategoriesSection
