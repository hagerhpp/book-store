const express = require("express");
const router = express.Router();
const {
  validateCreateBook,
  validateUpdateBook,
  Book,
} = require("../models/Book");

// const books = [
//   {
//     id: 1,
//     title: "The 5 AM club",
//     author: "Robin Sharma",
//     description: "Own your morning elevate your life",
//     price: 7.5,
//     cover: "Human development",
//   },
//   {
//     id: 2,
//     title: "Mindset",
//     author: "DR. Carol S. Dweck",
//     description: "Changing the way youthink to fulfil your potential",
//     price: 11.99,
//     cover: "Mentally improvment",
//   },
//   {
//     id: 3,
//     title: "Quiet",
//     author: "Susan cain",
//     description: "The power of introverts in a World that can't stop talking",
//     price: 10,
//     cover: "Human development",
//   },
// ];

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
router.get("/", async (req, res) => {
  try {
    const booksList = await Book.find().populate("author", ["_id","firstName","lastName"]);
    res.status(200).json(booksList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Get the book by Id
 * @route /api/books/:id
 * @method GET
 * @access public
 */
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "A book not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Create a new book
 * @route /api/books
 * @method POST
 * @access public
 */
router.post("/", async (req, res) => {
  const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });

    const result = await book.save();
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Update the book by Id
 * @route /api/books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", async (req, res) => {
  const { error } = validateUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

/**
 * @desc Delete the book by Id
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const book = Book.findByIdb(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "A book has been deleted" });
    } else {
      res.status(404).json({ message: "A book not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
