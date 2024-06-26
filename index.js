// Mongoose commands -> https://mongoosejs.com/docs/queries.html
const express = require('express');
// Creating an Express application
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');

app.use(cors());
// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse incoming URL-encoded requests
app.use(express.urlencoded({extended: false}));

// Route to test node server
app.get('/hello', (req, res) => {
    res.send("Hello from Node API Server");
});

// Route to handle GET requests to fetch a specific product by ID
app.get('/api/products/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({message: `Product '${id}' does not exist!`});
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Route to handle GET requests to fetch all products
app.get('/api/products', async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Route to handle POST requests to add a new product
app.post('/api/product/add', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Route to handle PUT requests to update a product by ID
app.put('/api/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            return res.status(404).json({message: `Product '${id}' does not exist!`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Route to handle DELETE requests to delete a product by ID
app.delete('/api/product/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({message: `Product '${id}' does not exist!`});
        }

        res.status(200).json({message: `Product '${id}' has been deleted!`});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Connecting to MongoDB using Mongoose
mongoose.connect("mongodb+srv://only-for-node:7c9GTf3HbhXmdJFE@backenddb.2ansun2.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to MONGO!");
    app.listen(80, () => {
        console.log("Server is running on port 80!")
    });
})
.catch(() => {
    console.log("Connection failed!");
});