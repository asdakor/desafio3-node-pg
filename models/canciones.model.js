import { pool } from "../database/connection.js";

const findAll = async () => {
    const query = {
        text: 'SELECT * FROM canciones LIMIT 10',
        values: []
    }
    const { rows } = await pool.query(query)
    return rows
}

const buscarID = async (id) => {
    const query = {
        text: "SELECT * FROM canciones WHERE id = $1",
        values: [id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const agregar = async ({ titulo, artista, tono}) => {
    const query = {
        text: "INSERT INTO canciones (titulo ,artista ,tono) values ($1, $2, $3) RETURNING *",
        values: [titulo, artista, tono]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

const eliminar = async ( id ) => {
    const query = {
        text: "DELETE FROM canciones WHERE id = $1 RETURNING *",
        values: [id]
    };
    const { rows } = await pool.query(query);
    return;
}

export const cancionesModel = {
    findAll, agregar, buscarID, eliminar
}