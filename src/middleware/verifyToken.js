const JWT = require('jsonwebtoken');
const constants = require('../library/constants')

const verifyToken = async (request, response, next) => {
    let token;
    const secretKey = constants.variables.serverKey;

    if (request.headers.authorization) {
        token = request.headers.authorization.split(' ')[1];
    } else {
        token = null;
    }

    // console.log(token);
    
    JWT.verify(token, secretKey, async function (error, decoded) {
        // console.log(decoded);
        if(error) {
            // send response
            return response.status(403).send({
                _status: false,
                _message: "Unauthorized",
                _data : null
            });
            // --------------
        } else {
            request.user = {
                id: decoded.name,
            };
            // --------
            // console.log(decoded);
            next();
        }
    });
}

module.exports = verifyToken;