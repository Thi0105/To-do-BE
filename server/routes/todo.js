const express = require('express')
const { query } = require('../helpers/db.js')

const todoRouter = express.Router()

todoRouter.get("/", async (req, res) => {
    try {
        const result = await query('SELECT * FROM task')
        const rows = result.rows? result.rows : []
        res.status(200).json(rows)
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})


todoRouter.post("/new", async (req, res) => {
    try {
        const result = await query('INSERT INTO task (description) VALUES ($1) RETURNING *',
        [req.body.description])
        res.status(200).json({id: result.rows[0].id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

todoRouter.delete("/delete/:id", async(req, res) => {
    try {
        const id = req.params.id
        const result = await query('DELETE FROM task WHERE id = $1', [id])
        res.status(200).json({id: id})
    } catch (error) {
        console.log(error)
        res.statusMessage = error
        res.status(500).json({error: error})
    }
})

module.exports = {
    todoRouter
}