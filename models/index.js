// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Mod 13 Act 23

// Products belongsTo Category
// establishes 1-to-1 relationship
Product.belongsTo(Category, {
  foreignKey: "category_id",
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
  otherKey: "tag_id",
});

// Tags belongToMany Products (through ProductTag)
// from sequelize documentation
// switch the foreign and other keys (change if needed after testing)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id",
  otherKey: "product_id",
});


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
