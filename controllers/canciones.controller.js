import { cancionesModel } from "../models/canciones.model.js"

const canciones = async (req, res) => {
    try {
        const canciones = await cancionesModel.findAll()
        return res.json(canciones)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const cancionAgregar = async (req, res) => {
    try {
        const { titulo, artista, tono } = req.body
        const nuevaCancion = { titulo, artista, tono }
        const cancionesDB = await cancionesModel.agregar(nuevaCancion)
        return res.status(201).json(cancionesDB)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const cancionEliminar = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ ok: false, msg: "ID de canción no proporcionado" });
        }

        const cancion = await cancionesModel.buscarID(id);
        if (!cancion) {
            return res.status(404).json({ ok: false, msg: "No se encontró la canción" });
        }

        await cancionesModel.eliminar(cancion.id);

        return res.status(200).json({ ok: true, msg: "Canción eliminada correctamente" });
    } catch (error) {
        console.error('Error interno del servidor:', error);
        return res.status(500).json({ ok: false, msg: "Error interno del servidor" });
    }
};


export const cancionesController = {
    canciones, cancionAgregar, cancionEliminar
}