const express = require("express");
const router = express.Router();
const Joi = require('joi');

const books = [
  {
    id: 1,
    title: "The 5 AM club",
    author: "Robin Sharma",
    description: "Own your morning elevate your life",
    price: 7.5,
    cover: "Human development",
  },
  {
    id: 2,
    title: "Mindset",
    author: "DR. Carol S. Dweck",
    description: "Changing the way youthink to fulfil your potential",
    price: 11.99,
    cover: "Mentally improvment",
  },
  {
    id: 3,
    title: "Quiet",
    author: "Susan cain",
    description: "The power of introverts in a World that can't stop talking",
    price: 10,
    cover: "Human development",
  },
];

/**
 * @desc Get all books
 * @route /api/books
 * @method GET
 * @access public 
*/
router.get("/", (req, res) => {
  res.status(200).json(books);
});

/**
 * @desc Get the book by Id
 * @route /api/books/:id
 * @method GET
 * @access public 
*/
router.get("/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "A book not found" });
  }
});

/**
 * @desc Create a new book
 * @route /api/books
 * @method POST
 * @access public 
*/
router.post("/", (req, res) => {

    const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
    };
    
  books.push(book);
  res.status(201).json(book); // 201 => Created successfully
});

/**
 * @desc Update the book by Id
 * @route /api/books/:id
 * @method PUT
 * @access public 
*/
router.put("/:id", (req, res) => {
    const { error } = validateUpdateBook(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({ message: "A book has been updated" });
    } else {
        res.status(404).json({ message: "A book not found" });
    }
});

/**
 * @desc Delete the book by Id
 * @route /api/books/:id
 * @method DELETE
 * @access public 
*/
router.delete("/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({ message: "A book has been deleted" });
    } else {
        res.status(404).json({ message: "A book not found" });
    }
});

// The Validate Of Create Book
function validateCreateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(3).max(200).required(),
        description: Joi.string().trim().min(3).max(500).required(),
        price: Joi.number().min(3).required(),
        cover: Joi.string().trim().required(),
    });

    return schema.validate(obj);
}

// The Validate Of Update Book
function validateUpdateBook(obj) {
    const schema = Joi.object({
        title: Joi.string().trim().min(3).max(200),
        author: Joi.string().trim().min(3).max(200),
        description: Joi.string().trim().min(3).max(500),
        price: Joi.number().min(3),
        cover: Joi.string().trim(),
    });

    return schema.validate(obj);
}

module.exports = router;
