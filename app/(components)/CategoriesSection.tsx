import Category from "./Category"

const CategoriesSection = () => {
  return (
    <section className="flex flex-col gap-10 min-h-screen py-8">
      <h2 className="text-4xl font-bold text-center ">
        Categorias que queremos recomendarte
      </h2>

      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 w-full place-content-center place-items-center items-center justify-center`}
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
          title="Combos y agregados"
          img="/fondos/fondos1.jpg"
          link="/productos?page=1&categoryId=5"
        />
      </div>
    </section>
  )
}

export default CategoriesSection
