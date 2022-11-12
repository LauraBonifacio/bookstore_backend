const express = require("express");
const BookController = require("./controllers/BookController");
const AuthorController = require("./controllers/AuthorController");

const router = express.Router();

router.get("/books", BookController.index);
router.post("/books", BookController.store);

router.get("/authors", AuthorController.index);
router.post("/authors", AuthorController.store);

module.exports = router;
