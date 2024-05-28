import { pool } from "../database/connection.js";

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM canciones LIMIT 10',
        values: []
    }
    const { rows } = await pool.query(query)
    return rows
}

const agregar = async ({ titulo, artista, tono}) => {
    const query = {
        text: "INSERT INTO canciones (titulo ,artista ,tono) values ($1, $2, $3) RETURNING *",
        values: [titulo, artista, tono]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}
export const cancionesModel = {
    findAll, agregar
}