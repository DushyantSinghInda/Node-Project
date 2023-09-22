const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    categoryID: String,
    pro_name: String,
    pro_act_price : Number,
    pro_sale_price: Number,
    // pro_img:{data: Buffer,contentType: String},
    pro_status: Boolean,
});

module.exports = mongoose.model('products',productSchema);