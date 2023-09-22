module.exports = (app) => { 
    const cart = require('../../controller/webApi/cart.controller');
    router = require('express').Router();

    // const verifyToken = require('../../middleware/verifyToken');
    // const validateRequest = require('../../middleware/validateRequest');
    // const userValidation = require('../../middleware/validation/userValidation');

    router.post('/add', cart.addItem);

    router.get('/view', cart.viewItem);

    // router.get('/find/:id', cart.findItem);

    router.put('/update/:id', cart.updateItem);

    router.delete('/delete/:id', cart.deleteItem);

    app.use('/cart', router);
}