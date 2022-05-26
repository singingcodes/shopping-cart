import express from "express"
import models from "../../db/models/index.js"

const { User, Review } = models

const userRouter = express.Router()

// GET /api/users
userRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: { model: Review, attributes: ["text"] },
    })
    res.send(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/:id
userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: { model: Review, attributes: ["text", "username"] },
    })
    if (!user) {
      throw createError(404, "User not found")
    }
    res.send(user)
  } catch (err) {
    next(err)
  }
})

// POST /api/users
userRouter.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send(user)
  } catch (err) {
    next(err)
  }
})
// PUT /api/users/:id
userRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    res.send(user[1][0])
  } catch (error) {
    next(error)
  }
})

// DELETE /api/users/:id
userRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id },
    })
    res.send({ user })
  } catch (error) {
    next(error)
  }
})

export default userRouter
