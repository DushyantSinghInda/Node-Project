module.exports = (app) => { 
    const product = require('../../controller/webApi/product.controller');
    router = require('express').Router();

    // const verifyToken = require('../../middleware/verifyToken');
    // const validateRequest = require('../../middleware/validateRequest');
    // const userValidation = require('../../middleware/validation/userValidation');

    router.post('/add', product.addProduct);

    router.get('/view', product.viewProduct);

    router.get('/find/:id', product.findProduct);

    router.put('/update/:id', product.updateProduct);

    router.delete('/delete/:id', product.deleteProduct);

    app.use('/product', router);
}