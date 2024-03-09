const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({ include: ({model: Product }) });
    res.status(200).json(categories)
  } catch(err) {
    res.status(500).json({message: 'category not found'})
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, { include: ({ model: Product}) })
    if(!category) {
      res.status(404).json({ message: `no category with the id of '${req.params.id}'`})
      return;
    }
    res.status(200).json(category)
    }catch (err) {
      res.status(500).json({ message: 'id not found'})
        }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body)
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    })

    if(!categoryData) {
      res.status(404).json("No category found with that id")
    }

    res.status(200).json("Category name successfully changed")
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json("No category found with this id")
    }

    res.status(200).json("Successfully deleted")
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;