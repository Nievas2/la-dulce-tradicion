"use client"

import { useState } from "react"
import { useDropzone } from "react-dropzone"
const page = () => {
  /* const [selectedImage, setSelectedImage] = useState(null)
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

    try {
      const response = await fetch("http://localhost:4001/image/upload", {
        method: "POST",
        body: formData // Enviar el FormData
      })

      const data = await response.json()
      if (response.ok) {
        setUploadMessage(`Imagen subida exitosamente: ${data.url}`)
      } else {
        setUploadMessage(`Error: ${data.error}`)
      }
    } catch (error) {
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
  ) */
  const [images, setImages] = useState([])
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
  return (
    <div>
      <div
        {...getRootProps()}
       /*  style={dropzoneStyle} */
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
      <button onClick={() => handleSubmit()}>testt</button>
    </div>
  )
}
/* const dropzoneStyle = {
  border: "2px dashed #007bff",
  borderRadius: "5px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
  backgroundColor: "#f9f9f9"
} */
export default page
