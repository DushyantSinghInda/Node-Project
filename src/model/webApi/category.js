const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_name: String,
    cat_status: Boolean
});

module.exports = mongoose.model('category', categorySchema);