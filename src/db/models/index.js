import Product from "./products.js"
import Review from "./reviews.js"
import Category from "./categories.js"
import ProductCategory from "./productCategories.js"
import User from "./users.js"
import Like from "./likes.js"
import Cart from "./carts.js"

User.hasMany(Cart, {
  foreignKey: "userId",
  as: "cart",
})

User.hasMany(Cart, { onDelete: "CASCADE" })
Cart.belongsTo(User, { onDelete: "CASCADE" })

Product.hasMany(Cart, { onDelete: "CASCADE" })
Cart.belongsTo(Product, { onDelete: "CASCADE" })

Product.hasMany(Like, {
  onDelete: "CASCADE",
})
Product.belongsToMany(User, {
  through: { model: Like, unique: false },

  onDelete: "CASCADE",
})

User.belongsToMany(Product, {
  through: { model: Like, unique: false },

  onDelete: "CASCADE",
})

Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
})
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
})
Product.hasMany(Review)
Review.belongsTo(Product)

Product.belongsTo(User)
User.hasMany(Product)

Review.belongsTo(User)
User.hasMany(Review)

Product.hasMany(Review)
Review.belongsTo(Product)

export default { Product, Review, Category, ProductCategory, User, Like, Cart }
