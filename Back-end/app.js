const express = require("express");
const booksPath = require("./routes/books.js");
const authorsPath = require("./routes/authors.js");
const authPath = require("./routes/auth.js");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger.js");
const { notFound, errorHandler } = require("./middlewares/errors.js");
const dotenv = require("dotenv");
dotenv.config();

// Connection To Database
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected To MongoDB..."))
    .catch((error) => console.log("Connection Failed To MongoDB!", error));

// Init App
const app = express();

// Apply Middlewares
app.use(express.json());

app.use(logger);

// Routes
app.use("/api/books", booksPath);
app.use("/api/authors", authorsPath);
app.use("/api/auth", authPath);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT} `));
