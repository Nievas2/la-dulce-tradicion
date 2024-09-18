"use client"

import { postImageProduct } from "@/services/ImageProduct"
import { useState } from "react"
import { useDropzone } from "react-dropzone"
const page = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploadMessage, setUploadMessage] = useState("")

  const handleImageChange = (event : any) => {
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      setSelectedImage(file) // Guardar el archivo seleccionado
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Por favor selecciona una imagen primero.")
      return
    }

    const formData = new FormData()
    formData.append("image", selectedImage) // Añadir el archivo al FormData
    const user = localStorage.getItem("user")
    const token = JSON.parse(user!)?.token
    try {
      /* const response = await fetch("http://localhost:4001/imageproduct/add/1", {
        method: "POST",
        //se coloca el token en el encabezado
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData // Enviar el FormData
        
      }) */
      const response2 = await postImageProduct(formData, 1)

      console.log(response2)
    /*   if (response.ok) {
        setUploadMessage(`Imagen subida exitosamente: ${data.url}`)
      } else {
        setUploadMessage(`Error: ${data.error}`)
      } */
    } catch (error) {
      console.log(error);
      
      setUploadMessage("Error al subir la imagen")
    }
  }

  return (
    <div>
      <h1>Subir Imagen a Cloudinary</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Subir Imagen</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  )
 /*  const [images, setImages] = useState([])
  const onDrop = (acceptedFiles: any) => {
    // Aquí puedes manejar los archivos aceptados
    console.log("Archivos aceptados:", acceptedFiles)
    setImages(acceptedFiles)
  }

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [] // Aceptar solo imágenes
      }
    })
  function handleSubmit() {
    const imagesUpload = [...images]
    imagesUpload.forEach(async (image) => {
      if (image != undefined) {
        let formData = new FormData()
        formData.append("image", image)
        const response = await fetch("http://localhost:4001/image/upload", {
          method: "POST",
          body: formData // Enviar el FormData
        })

        const data = await response.json()
        console.log(data)
      }
    })
  }
  function handleRemoveImage(index: any) {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }
  return (
    <div>
      <div
        {...getRootProps()}
        className="border border-secondary hover:bg-secondary/80 bg-white text-black transition-colors duration-300 h-10 px-4 py-2 rounded-md"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta las imágenes aquí ...</p>
        ) : isDragReject ? (
          <p>¡Solo se permiten imágenes!</p>
        ) : (
          <p>
            Arrastra y suelta algunas imágenes aquí, o haz clic para seleccionar
            archivos
          </p>
        )}
      </div>
      {images.map((image: any, index: number) => (
        <img
          src={URL.createObjectURL(image)}
          alt="uploaded"
          width={200}
          height={200}
          key={image.name}
          onClick={() => handleRemoveImage(index)}
        />
      ))}
      <button onClick={() => handleSubmit()}>testt</button>
    </div>
  ) */
}
/* const dropzoneStyle = {s
  border: "2px dashed #007bff",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  backgroundColor: "#f9f9f9"
} */
export default page
