const express = require("express");
const router = express.Router();
const Joi = require('joi');

const authors = [
    {
        id: 1,
        firstName: "Amr",
        lastName: "Sal",
        nationality: "Egypt",
        image: "default-image.png",
    },
];


/**
 * @desc Get All Authors
 * @route /api/authors
 * @method GET
 * @access public 
*/
router.get("/", (req, res) => {
  res.status(200).json(authors);
});

/**
 * @desc Get An Author By Id
 * @route /api/authors/:id
 * @method GET
 * @access public 
*/
router.get("/:id", (req, res) => {
  const author = authors.find(b => b.id === parseInt(req.params.id));
  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "An author not found" });
  }
});

/**
 * @desc Create A New Author
 * @route /api/authors
 * @method POST
 * @access public 
*/
router.post("/", (req, res) => {

    const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = {
    id: authors.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    nationality: req.body.nationality,
    image: req.body.image,
    };
    
    authors.push(author);
  res.status(201).json(author); // 201 => Created successfully
});

/**
 * @desc Update The Author By Id
 * @route /api/authors/:id
 * @method PUT
 * @access public 
*/
router.put("/:id", (req, res) => {
    const { error } = validateUpdateAuthor(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const author = authors.find(b => b.id === parseInt(req.params.id));
    if (author) {
        res.status(200).json({ message: "An author has been updated" });
    } else {
        res.status(404).json({ message: "An author not found" });
    }
});

/**
 * @desc Delete The Author By Id
 * @route /api/authors/:id
 * @method DELETE
 * @access public 
*/
router.delete("/:id", (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.status(200).json({ message: "An author has been deleted" });
    } else {
        res.status(404).json({ message: "An author not found" });
    }
});

// The Validate Of Create Author
function validateCreateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        nationality: Joi.string().trim().min(3).max(200).required(),
        image: Joi.string()
    });

    return schema.validate(obj);
}

// The Validate Of Update Author
function validateUpdateAuthor(obj) {
    const schema = Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        nationality: Joi.string().trim().min(3).max(200),
        image: Joi.string()
    });

    return schema.validate(obj);
}

module.exports = router;