const mongodb = require('mongodb');
const user = require('../../model/webApi/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const constants = require('../../library/constants');

// Register User Api starts here

exports.registerUser = async (request,response) => {
    var verifyData = await user.findOne({"Email" : request.body.Email});

    const secretKey = constants.variables.serverKey;
    var token = jwt.sign({ Name : request.body.Name }, secretKey, {/* { expiresIn : '50S' }*/});

    var data = user ({
        'Name' : request.body.Name,
        'Email' : request.body.Email,
        'mobile_number' : request.body.mobile_number,
        'Password' : bcrypt.hashSync(request.body.Password, 10)
    });

    if (!verifyData) {
        await data.save();
        var arr = {
            'status' : true,
            'message' : 'Record Inserted Successfully !!',
            'token' : token,
            'data' : data
        };
    } else {
        var arr = {
            'status' : false,
            'message' : 'Record Already Exists',
            'data' : verifyData
        };
    }

    response.send(arr);
}

exports.viewUser = async (request, response) => {
    const viewData = await user.find();
    // console.log(request.user.id);
    if(!viewData) {
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

exports.loginUser = async (request, response) => {
    var verifyEmail = await user.findOne({"Email" : request.body.Email});

    if(!verifyEmail){
        var arr = {
            'status' : false,
            'message' : "Please Enter Valid Email !!",
        }
    } else {
        var verifyPassword = bcrypt.compareSync(request.body.Password, verifyEmail.Password);

        if(verifyPassword) {
            const secretKey = constants.variables.serverKey;
            var token = jwt.sign({ Email : request.body.Email }, secretKey, {/* { expiresIn : '50S' }*/});
            var arr = {
                'status' : true,
                'message' : 'You logged in successfully !!',
                'data' : verifyEmail,
                'token' : token
            };
        } else {
            var arr = {
                'status' : false,
                'message' : 'You entered wrong password !!'
            }
        }
    }

    response.send(arr);
}

// Update user API
exports.updateUser = async (request, response) => {
    
    const data = {
        'Name' : request.body.name,
        'mobile_number' : request.body.mobile_number,
        'Email' : request.body.email
    }

    const updateData = await user.updateOne({'_id' : new mongodb.ObjectId(request.params.id)},{ $set : data});

    var arr = {
        'status' : true,
        'message' : 'Record Updated Successfully !!'   
    };

    response.send(arr);
}

// Delete User API

exports.deleteUser = async (request, response) => {
    const deleteData = await user.deleteOne({'_id' : new mongodb.ObjectId(request.params.id)});

    var arr = {
        'status' : true,
        'message' : 'Record Deleted Successfully !!',
        'data' : deleteData
    };

    response.send(arr);
}