module.exports = (app) => { 
    const category = require('../../controller/webApi/category.controller');
    router = require('express').Router();

    // const verifyToken = require('../../middleware/verifyToken');
    // const validateRequest = require('../../middleware/validateRequest');
    // const userValidation = require('../../middleware/validation/userValidation');

    router.post('/add', category.addCategory);

    router.get('/view', category.viewCategory);

    router.put('/update/:name', category.updateCategory);

    router.delete('/delete/:name', category.deleteCategory);

    app.use('/category', router);
}