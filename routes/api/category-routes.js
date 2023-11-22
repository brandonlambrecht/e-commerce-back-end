const router = require('express').Router();
const { Category, Product } = require('../../models');



//Find all categories, `/api/categories` endpoint
router.get('/', async (req, res) => {
 
  try {
    const data = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Find category by id
router.get('/:id', async (req, res) => {

  try {
    const data = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new category 
router.post('/', async (req, res) => {
  try {
    const data = await Category.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update category by id
router.put('/:id', async (req, res) => {

  try {
    const data = await Category.update(
      req.body,
      {
        where: { id: req.params.id },
      }
    );

    if (!data) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete category by its id
router.delete('/:id', async (req, res) => {

  try {
    const data = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No category found with that id' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
