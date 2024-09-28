interface CategoryProps {
  img: string
  title: string
  subtitle: string
  description: string
  reverse: boolean
}
const Category = ({
  img,
  title,
  subtitle,
  description,
  reverse
}: CategoryProps) => {
  return (
    <div
      className={`flex flex-col items-center ${
        reverse ? "md:flex-row-reverse gap-32" : "md:flex-row"
      } z-20`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-6">
          {/* <div className="p-[17px] bg-main rounded-full">
            <Icon
                icon="formkit:people"
                width="24"
                height="24"
                className="text-light"
              />
          </div> */}

          <h3 className="text-3xl font-bold">{title}</h3>
        </div>

        <h4 className="text-2xl leading-[1.3] font-semibold lg:text-[30px] lg:leading-[51px] xl:max-w-[80%]">
          <span className="text-secondary">{subtitle}</span>
        </h4>

        <div className="text-base leading-[27px] xl:max-w-[70%]">
          <p>
           {description}
          </p>
        </div>
      </div>

      <img
        src={img}
        alt={title}
        className="w-[352px] lg:w-[40%] lg:max-w-[300px] lg:flex"
      />
    </div>
  )
}
export default Category
