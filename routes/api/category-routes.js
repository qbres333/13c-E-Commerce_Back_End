const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// from Mod 13 Act 24

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })
    // return an error if the catgory is not found
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    // if found, show data
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      // new category_name should be the request body
      category_name: req.body.category_name,
    })
    res.status(200).json(newCategory);
  } catch(err) {
    res.status(400).json(err);
  }

});

// from Mod 13 Act 19
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    // return an error if id not found
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    } 
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

// from Mod 13 Act 28
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category_data = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    // return an error if id not found
    if (!category_data) {
      res.status(404).json({ message: "No category found with that id!" });
    }
    res.status(200).json(category_data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
