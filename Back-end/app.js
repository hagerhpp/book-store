const express = require("express");
const booksPath = require("./routes/books.js");

// Init App
const app = express();

// Apply Middlewares
app.use(express.json());

// Routes
app.use("/api/books", booksPath);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} `));
