const express = require('express');
const path = require('path');
const publicDirectoryPath = path.join(__dirname, './../public');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(publicDirectoryPath));

app.get('/', )

app.listen(port, () => {
    console.log('Server is listening at port ', port);
})