const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userID: String,
    productID: String,
    quantity : Number,
});

module.exports = mongoose.model('carts',cartSchema);