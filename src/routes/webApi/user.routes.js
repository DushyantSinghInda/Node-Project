module.exports = (app) => { 
    const user = require('../../controller/webApi/user.controller');
    router = require('express').Router();

    const verifyToken = require('../../middleware/verifyToken');
    const validateRequest = require('../../middleware/validateRequest');
    const userValidation = require('../../middleware/validation/userValidation');

    router.post('/register',userValidation.rules, validateRequest, user.registerUser);

    router.get('/view', user.viewUser);

    router.get('/login', user.loginUser);

    router.put('/update/:id', verifyToken, user.updateUser);

    router.delete('/delete/:id', verifyToken, user.deleteUser);

    app.use('/user', router);
}