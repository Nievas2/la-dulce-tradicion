import * as Yup from 'yup';

export const ImageProductSchema = Yup.object().shape({
  Product: Yup.number()
    .required('El ID del producto es requerido')
    .positive('El ID del producto debe ser un número positivo')
    .integer('El ID del producto debe ser un número entero'),
  images: Yup.array()
    .of(
      Yup.object().shape({
        image: Yup.string()
          .url('Debe ser una URL válida')
          .required('La imagen es requerida'),
      })
    )
    .min(1, 'Debes agregar al menos una imagen') // Al menos una imagen es requerida
    .required('Las imágenes son requeridas'), // Validación adicional para el array
});

export default ImageProductSchema;
