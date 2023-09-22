const mongodb = require('mongodb');
const category = require('../../model/webApi/category');
const { response } = require('express');


exports.addCategory = async (request, response) => {
    
    var data = category ({
        'cat_name' : request.body.cat_name,
        'cat_status' : request.body.cat_status,
    });
    
    var verifyName = await category.findOne({"cat_name" : request.body.cat_name});
    
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

exports.viewCategory = async (request, response) => {
    const viewData = await category.find();
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

exports.updateCategory = async (request, response) => {

    const data = {
        'cat_name' : request.body.cat_name,
        'cat_status' : request.body.cat_status,
    };

    const verifyCat = await category.updateOne({'cat_name' : request.params.name}, {$set : data});

    if(verifyCat.matchedCount){
        var arr = {
            'status' : true,
            'message' : 'Category Updated Successfully !!'   
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'No Record Found !!'
        };
    }

    response.send(arr);
}

exports.deleteCategory = async (request, response) => {
    const deleteCat = await category.deleteOne({'cat_name' : request.params.name});

    if(deleteCat.deletedCount) {
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