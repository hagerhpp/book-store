const express = require("express");
const booksPath = require("./routes/books.js");
const authorsPath = require("./routes/authors.js");
const mongoose = require("mongoose");

// Connection To Database
mongoose
    .connect("mongodb://127.0.0.1/bookStoreDB")
    .then(() => console.log("Connected To MongoDB..."))
    .catch((error) => console.log("Connection Failed To MongoDB!", error));

// Init App
const app = express();

// Apply Middlewares
app.use(express.json());

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));
