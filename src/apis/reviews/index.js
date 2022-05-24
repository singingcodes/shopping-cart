import express from "express"
import models from "../../db/models/index.js"

const { Product, Review } = models

const reviewRouter = express.Router()

// GET /api/reviews
reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: Product })
    res.send(reviews)
  } catch (err) {
    next(err)
  }
})
// GET /api/reviews/:id
reviewRouter.get("/:id", async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id, {
      include: { model: Product },
    })
    if (!review) {
      throw createError(404, "Review not found")
    }
    res.send(review)
  } catch (err) {
    next(err)
  }
})

// POST /api/reviews
reviewRouter.post("/", async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.send(review)
  } catch (err) {
    next(err)
  }
})
// PUT /api/reviews/:id
reviewRouter.put("/:id", async (req, res, next) => {
  try {
    const review = await Review.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    res.send(review[1][0])
  } catch (error) {
    next(error)
  }
})
// DELETE /api/reviews/:id
reviewRouter.delete("/:id", async (req, res, next) => {
  try {
    const review = await Review.destroy({
      where: { id: req.params.id },
    })
    res.send({ review })
  } catch (error) {
    next(error)
  }
})

export default reviewRouter
