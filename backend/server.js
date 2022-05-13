const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());


// Database connectivity
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
 });

const connection= mongoose.connection;
connection.once('open', (err) => {
    console.log(err);
    console.log("Mongodb database connection established successfully !!");
})

// routing the request to controller
app.use('/api/user', require('./routes/user'));
app.use('/api/category', require('./routes/categoryRouter'));
app.use('/api/product', require('./routes/productRouter'));
app.use('/api/order', require('./routes/orderRouter'));
app.use('/login',require("./routes/auth"));
app.use('/uploads/actions', express.static(path.join(__dirname, 'uploads/actions')));
app.use('/static', express.static('public'))

// Starting server by specific router
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
