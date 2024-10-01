const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// from Mod 13 Act 23

router.get("/", async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Category }, { model: Tag }],
    });

    // show error msg if product id not found
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    // if found, show product
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find all tags, which should be an array
  // map the tags and set value to tadgIds
async function getTags() {
  const allTags = await Tag.findAll();
  const tagIds = allTags.map((tag) => tag = tag.id)
  return tagIds;
}


// create new product
// new productTag is only created when a product is created
router.post("/", (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  // call getTags function to get an array of ids
  const tagIds = getTags();

  //  similar to category post route .create method
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    tagIds,
  })
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
/* starter code updates productTag list at the same time; if tag deleted, 
productTag is removed if there are no products associated with the pairing 
// from Mod 13 Act 19 */
router.put("/:id", (req, res) => {
  // update product data
 
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  // this .then added to determine how many records were updated
    .then((productData) => {
      if (productData[0] === 0) {
        res.status(404).json({ message: "No product found with that id!" });
        return;
      }
    })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id },
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product); //no body returned but product properties get updated
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});


router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    // related productTags need to be deleted when/before the product is deleted
    // retrieve/delete all productTags for the product (Product id = ProductTag product_id)
    const getProductTags = await ProductTag.destroy({
      where: {
        product_id: req.params.id,
      }
    });

    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    // return an error if number returned is not 1 (successful deletion of one product)
    if (productData !== 1) {
      //added return so that no more code is executed after the error
      return res.status(404).json({ message: "No product found with that id!" });
    }
    //show number of products deleted (1)
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
