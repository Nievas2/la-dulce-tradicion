import mysql from "mysql2"
const db = mysql.createConnection({
  host: process.env.NEXT_PUBLIC_DB_HOST, // Cambia esto según tu configuración
  user: process.env.NEXT_PUBLIC_DB_USERNAME, // Cambia esto por tu usuario
  password: process.env.NEXT_PUBLIC_DB_PASSWORD, // Cambia esto por tu contraseña
  database: process.env.NEXT_PUBLIC_DB_DATABASE // Cambia esto por el nombre de tu base de datos
})
db.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Conectado a la base de datos")
  }
})

module.exports = db