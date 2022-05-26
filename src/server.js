import express from "express"
import cors from "cors"
import listEndPoints from "express-list-endpoints"
import createError from "http-errors"
import { cartDB } from "./db/index.js"
import productRouter from "./apis/products/index.js"
import reviewRouter from "./apis/reviews/index.js"
import categoryRouter from "./apis/categories/index.js"
import userRouter from "./apis/users/index.js"
import sequelize from "./db/index.js"

import {
  badRequestError,
  genericServerError,
  notFoundError,
  unauthorizedError,
} from "./errorHandlers.js"

const server = express()
const port = process.env.PORT || 3001

server.use(express.json())
server.use(cors())

//endpoints
server.use("/product", productRouter)
server.use("/review", reviewRouter)
server.use("/category", categoryRouter)
server.use("/user", userRouter)
// error handlers
server.use(badRequestError)
server.use(notFoundError)
server.use(unauthorizedError)
server.use(genericServerError)
server.listen(port, async () => {
  console.table(listEndPoints(server))
  console.log(`Server is running on port ${port}`)
  await cartDB()
  await sequelize.sync()
})
