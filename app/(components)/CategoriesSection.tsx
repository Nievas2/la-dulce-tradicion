import Category from "./Category"

const CategoriesSection = () => {
  return (
    <section className="flex flex-col gap-10">
      <h2 className="text-4xl font-bold text-center ">
        Categorias que queremos recomendarte
      </h2>

      <div
        className={`flex flex-col w-full text-black dark:text-light transition-colors duration-150 relative gap-16 xl:gap-0`}
      >
        <Category
          title="title"
          subtitle="subtitle"
          description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
            culpa placeat corrupti fuga dolores ducimus labore dignissimos
            assumenda magnam a non, consequatur unde officiis eaque sunt veniam
            aliquam reiciendis dicta. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Natus quo earum saepe quisquam ipsam voluptatibus
            asperiores maxime nesciunt nobis odit. Mollitia ab cum numquam
            corrupti doloribus quo laudantium, obcaecati aspernatur."
          img="/fondos/fondos1.jpg"
          reverse={true}
        />

        <Category
          title="title"
          subtitle="subtitle"
          description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
            culpa placeat corrupti fuga dolores ducimus labore dignissimos
            assumenda magnam a non, consequatur unde officiis eaque sunt veniam
            aliquam reiciendis dicta. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Natus quo earum saepe quisquam ipsam voluptatibus
            asperiores maxime nesciunt nobis odit. Mollitia ab cum numquam
            corrupti doloribus quo laudantium, obcaecati aspernatur."
          img="/fondos/fondos1.jpg"
          reverse={false}
        />
        <Category
          title="title"
          subtitle="subtitle"
          description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
            culpa placeat corrupti fuga dolores ducimus labore dignissimos
            assumenda magnam a non, consequatur unde officiis eaque sunt veniam
            aliquam reiciendis dicta. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Natus quo earum saepe quisquam ipsam voluptatibus
            asperiores maxime nesciunt nobis odit. Mollitia ab cum numquam
            corrupti doloribus quo laudantium, obcaecati aspernatur."
          img="/fondos/fondos1.jpg"
          reverse={true}
        />

        <Category
          title="title"
          subtitle="subtitle"
          description=" Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
            culpa placeat corrupti fuga dolores ducimus labore dignissimos
            assumenda magnam a non, consequatur unde officiis eaque sunt veniam
            aliquam reiciendis dicta. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Natus quo earum saepe quisquam ipsam voluptatibus
            asperiores maxime nesciunt nobis odit. Mollitia ab cum numquam
            corrupti doloribus quo laudantium, obcaecati aspernatur."
          img="/fondos/fondos1.jpg"
          reverse={false}
        />
      </div>
    </section>
  )
}

export default CategoriesSection
