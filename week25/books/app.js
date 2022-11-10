const express = require('express');
const app     = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.listen(3000,() => {
    console.log("Running on port 3000");
})