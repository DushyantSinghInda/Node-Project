const mongodb = require('mongodb');
const product = require('../../model/webApi/product');


exports.addProduct = async (request, response) => {
    var verifyName = await product.findOne({"pro_name" : request.body.pro_name});
    
    var data = product ({
        'categoryID' : request.body.categoryID,
        'pro_name' : request.body.pro_name,
        'pro_act_price' : request.body.pro_act_price,
        'pro_sale_price' : request.body.pro_sale_price,
        'pro_status' : request.body.pro_status,
    });

    if(verifyName) {
        var arr = {
            'status' : false,
            'message' : 'Product already exist !!'
        };
    } else {
        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Product added successfully !!',
            'data' : data
        }
    }

    response.send(arr);
}

exports.viewProduct = async (request, response) => {
    const viewData = await product.find();
    if(!viewData.length) {
        var arr = {
            'status' : false,
            'message' : 'No record Found !!',
        };
    } else {
        var arr = {
            'status' : true,
            'message' : 'Record Found Successfully !!',
            'data' : viewData
        };
    }

    response.send(arr);
}

exports.updateProduct = async (request, response) => {

    var data = {
        'categoryID' : request.body.categoryID,
        'pro_name' : request.body.pro_name,
        'pro_act_price' : request.body.pro_act_price,
        'pro_sale_price' : request.body.pro_sale_price,
        'pro_status' : request.body.pro_status,
    };

    const verifyPro = await product.updateOne({'_id' : new mongodb.ObjectId(request.params.id)}, {$set : data});

    if(verifyPro.matchedCount){
            var arr = {
                'status' : true,
                'message' : 'Product Updated Successfully !!'
            };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Record Found !!'
        };
    }

    response.send(arr);
}

exports.deleteProduct = async (request, response) => {

    const deletePro = await product.deleteOne({'_id' : new mongodb.ObjectId(request.params.id)});

    if(deletePro.deletedCount) {
        var arr = {
            'status' : true,
            'message' : 'Record deleted successfully !!',
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No record found !!',
        };
    }
    response.send(arr);

}

exports.findProduct = async (request, response) => {
    const findProduct = await product.findOne({'_id' : new mongodb.ObjectId(request.params.id)});

    if(findProduct) {
        var arr = {
            'status' : true,
            'message' : 'Record Found Successfully !!',
            'data' : findProduct
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Record Found !!',
        };
    }

    response.send(arr);
}