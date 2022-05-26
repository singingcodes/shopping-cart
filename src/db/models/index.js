import Product from "./products.js"
import Review from "./reviews.js"
import Category from "./categories.js"
import ProductCategory from "./productCategories.js"
import User from "./users.js"

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

export default { Product, Review, Category, ProductCategory, User }
