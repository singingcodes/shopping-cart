import express from "express"
import models from "../../db/models/index.js"

const { Product, Review, User, ProductCategory, Category, Like } = models

const productRouter = express.Router()

// GET /api/products

productRouter.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: req.query.search && {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${req.query.search}%`,
            },
          },
        ],
      },
      include: [
        { model: User, as: "user" },
        { model: Review, attributes: ["text"] },

        { model: Category, through: { attributes: [] } },

        //include the likes,
        //but only the userId and the productId
        //so that we can use the userId to find the user
        //and the productId to find the product
        //and then we can use the userId and the productId
        { model: Like, attributes: ["isLike"] },
      ],
      order: [["price", "ASC"]],
    })

    res.send(products)
  } catch (err) {
    next(err)
  }
})
// GET /api/products/:id
productRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: { model: Review },
    })
    if (!product) {
      throw createError(404, "Product not found")
    }
    res.send(product)
  } catch (err) {
    next(err)
  }
})
// POST /api/products
productRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, price, image, categories } = req.body
    const product = await Product.create({ name, description, price, image })

    const productId = product.id
    const data = []
    categories.forEach((categoryId) => {
      data.push({ productId, categoryId })
    })
    await ProductCategory.bulkCreate(data)
    res.send(product)
  } catch (err) {
    next(err)
  }
})
// PUT /api/products/:id
productRouter.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    })
    res.send(product[1][0])
  } catch (error) {}
})

// DELETE /api/products/:id
productRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.destroy({
      where: { id: req.params.id },
    })
    res.send({ product })
  } catch (error) {}
})

//GET /api/products/like
//add a like to a product
productRouter.post("/like", async (req, res, next) => {
  try {
    const { userId, productId, isLike } = req.body
    const like = await Like.create({ userId, productId, isLike })
    res.send(like)
  } catch (err) {
    next(err)
  }
})

//DELETE /api/products/:id/Unlike
//remove a like from a product
productRouter.delete("/:id/unlike", async (req, res, next) => {
  try {
    const like = await Like.destroy({
      where: { id: req.params.id },
    })
    res.send({ like })
  } catch (err) {
    next(err)
  }
})

export default productRouter
