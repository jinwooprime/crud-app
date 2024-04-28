# Node.js API with Express and MongoDB

This is a simple Node.js API built using Express.js and MongoDB. It provides CRUD (Create, Read, Update, Delete) operations for managing products.

## Features

- **GET** `/api/products`: Get all products.
- **GET** `/api/products/:id`: Get a specific product by ID.
- **POST** `/api/product/add`: Add a new product.
- **PUT** `/api/product/:id`: Update a product by ID.
- **DELETE** `/api/product/:id`: Delete a product by ID.

## Prerequisites

Before running the API, you need the following installed:

- Node.js
- MongoDB

## Setup

1. Clone this repository.
2. Install dependencies: `npm i`.
3. Start the server: `npm run dev`.
4. Connect to MongoDB by replacing `<username>` and `<password>` in `app.js` with your credentials.
