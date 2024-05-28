import { cancionesModel } from "../models/canciones.model.js"

const canciones = async (req, res) => {
    try {
        const canciones = await cancionesModel.findAll()
        console.log(canciones)
        return res.json(canciones)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

const cancionAgregar = async (req, res) => {
    try {
        const { titulo, artista, tono} = req.body
        const nuevaCancion = { titulo, artista, tono}
        const cancionesDB = await cancionesModel.agregar(nuevaCancion)
        return res.status(201).json(cancionesDB)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ ok: false })
    }
}

export const cancionesController = {
    canciones, cancionAgregar
}