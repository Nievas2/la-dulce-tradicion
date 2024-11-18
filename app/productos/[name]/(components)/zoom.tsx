import { useState } from "react"

const Zoom = ({ src, alt }: { src: string; alt: string }) => {
  const [position, setPosition] = useState({ x: "50%", y: "50%" })

  const handleMouseMove = (e: any) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setPosition({ x: `${x}%`, y: `${y}%` })
  }

  return (
    <div
      className="relative max-w-96 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-[2]"
        style={{
          transformOrigin: `${position.x} ${position.y}`,
        }}
      />
    </div>
  )
}

export default Zoom
