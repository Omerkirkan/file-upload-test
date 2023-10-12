const express = require('express');
const app = express();
const port = 3000;
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const upload = require("./upload");

app.post('/upload-img', upload("one"));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});