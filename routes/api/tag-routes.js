const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


// Find all tags, `/api/tags` endpoint
router.get("/", async (req, res) => {
  try {
    const data = await Tag.findAll({
      include: [{ model: Product }],
    });

    if (!data) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find single tag by id
router.get("/:id", async (req, res) => {
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!data) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new tag
router.post("/", async (req, res) => {
  try {
    const data = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update new tag by id
router.put("/:id", async (req, res) => {
 
  try {
    const data = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: { id: req.params.id },
      }
    );

    if (!data) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * Delete one tag by its `id` value
 */
router.delete("/:id", async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: "No tag found with that id!" });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
