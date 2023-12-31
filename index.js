require('./src/config/mongodb');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./src/routes/webApi/user.routes')(app);
require('./src/routes/webApi/product.routes')(app);
require('./src/routes/webApi/category.routes')(app);
require('./src/routes/webApi/cart.routes')(app);

// API for server testing
app.get('', (request,response) => {
    response.send("Server is working fine.");
});

// API for wrong URL
app.use((request,response) => {
    var arr = {
        'status' : false,
        'message' : "Oops, something went wrong !!"
    }

    response.status(404).send(arr);
});

app.listen(3001);