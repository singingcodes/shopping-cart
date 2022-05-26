import express from "express"
import models from "../../db/models/index.js"

const { Product, Review, User, ProductCategory, Category } = models

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
        { model: Review, attributes: ["text"] },

        { model: Category, through: { attributes: [] }, Review },
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
    res.send(product)
    const productId = product.id
    const data = []
    categories.forEach((categoryId) => {
      data.push({ productId, categoryId })
    })
    await ProductCategory.bulkCreate(data)
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

export default productRouter
