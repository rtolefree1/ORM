const router = require('express').Router();
// const { canTreatArrayAsAnd } = require('sequelize/types/utils');
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try{
    // find all categories
    const allCategories = await Category.findAll();
     // be sure to include its associated Products --- DO I NEED THE NEXT LINE???
   // include: [{model:Tag, through:product_tag, as: 'tag_product_tag'}]
    res.status(200).json(allCategories);
  }catch(err){
    res.status(500).json(err);
  }

 
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include:[{model:Product}]
      //include:[{model:Tag, through:product_tag, as: 'tag_product_tag'}]
    });

    if(!categoryData){
      res.status(404).json({message: 'No Category found with this id'})
    }
    //else{
      res.status(200).json(categoryData)
    //}

  }catch(err){
    res.status(500).json(err);
  }
  
})

router.post('/', async (req, res) => {
  // create a new category
  try{
      const categoryData = await Category.create(req.body);
      res.status(200).json(categoryData);
  }catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    }
    
  })

  .then((category) => {
    // find all associated tags from Catog
    return res.status(200).json(category)
  })
  .catch((err) => {
    return res.status(400).json(err);}
  )
  // const categoryData = await Category.
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if(!categoryData){
      res.status(404).json({message: 'No category found with this id'});
      return;
    }
    res.status(200).json(categoryData)
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
