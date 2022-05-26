import express from "express"
import models from "../../db/models/index.js"

const { Category } = models

const categoryRouter = express.Router()

// GET /api/categories
categoryRouter.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.send(categories)
  } catch (err) {
    next(err)
  }
})

// POST /api/categories
categoryRouter.post("/", async (req, res, next) => {
  try {
    const category = await Category.bulkCreate([
      { name: "Fashion" },
      { name: "Electronics" },
      { name: "Home" },
      { name: "Sports" },
      { name: "Toys" },
      { name: "Books" },
    ])
    res.send(category)
  } catch (err) {
    next(err)
  }
})

export default categoryRouter
