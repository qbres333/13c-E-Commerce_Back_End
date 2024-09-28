const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// similar to category_routes file

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    // changed findByPk to findOne (test does not match demo); Finders documentation
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product }],
    });
    // return an error if tag id not found
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    // show data if found
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/", async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create({
      tag_name: req.body.tag_name,
    })
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// from Mod 13 Act 19, dev.to documentation
router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // first find the tag
    // .update returns an array with the number of affected objects
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    // return an error if value of first element is 0
    if (updateTag[0] === 0) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    // return an error if id not found
    if (!tagData) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }
    // show the deleted tag
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
