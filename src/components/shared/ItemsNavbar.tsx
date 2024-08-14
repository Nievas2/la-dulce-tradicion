interface ItemsNavbarProps {
  link: string
  name: string
}
const ItemsNavbar = ({ link, name }: ItemsNavbarProps) => {
  return (
    <li>
      <a href={link}>{name}</a>
    </li>
  )
}
export default ItemsNavbar
