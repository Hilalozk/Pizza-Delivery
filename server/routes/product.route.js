const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products.controller');
const auth = require('../middleware/auth');
const { addProductValidator } = require('../middleware/validations');

//only admin can post 
router.post('/', auth('createAny','product'), addProductValidator, productsController.addProduct);
router.route('/product/:id')
.get(productsController.getProductById)
.patch(auth('updateAny','product'),productsController.updateProductById)
.delete(auth('deleteAny','product'),productsController.deleteProductById)
router.get('/all', productsController.allProducts);

//paginate filters
router.post('/paginate/all', productsController.paginateProducts);


module.exports = router;

{/*

{
    "title":"Turkish",
    "description":"pepper, corn, cheese",
    "price":"10",
    "image":""
}

{
    "email":"qimia@gmail.com",
    "password":"deneme123"
}

 */}