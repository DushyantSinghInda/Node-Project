const mongodb = require('mongodb');
const cart = require('../../model/webApi/cart');

exports.addItem = async (request, response) => {    
    var data = cart ({
        'userID' : request.body.userID,
        'productID' : request.body.productID,
        'quantity' : request.body.quantity,
    });

        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Product added successfully !!',
            'data' : data
        }

    response.send(arr);
}

exports.viewItem = async (request, response) => {
    const viewData = await cart.find();
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

exports.updateItem = async (request, response) => {

    var data = {
        'quantity' : request.body.quantity,
    };

    const verifyCart = await cart.updateOne({'_id' : new mongodb.ObjectId(request.params.id)}, {$set : data});

    if(verifyCart.matchedCount){
            var arr = {
                'status' : true,
                'message' : 'Item Updated Successfully !!'
            };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Record Found !!'
        };
    }

    response.send(arr);
}

exports.deleteItem = async (request, response) => {

    const deletePro = await cart.deleteOne({'_id' : new mongodb.ObjectId(request.params.id)});

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