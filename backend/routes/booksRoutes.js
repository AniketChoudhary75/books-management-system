import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to create a new book
router.post('/', async (req, res) => {
    try {
        const { title, author, publisherYear } = req.body;

        if (!title || !author || !publisherYear) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const newBook = {
            title,
            author,
            publisherYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send({ message: 'Book not found' });

        return res.status(200).json(book);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to update a book by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, author, publisherYear } = req.body;

        if (!title || !author || !publisherYear) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).send({ message: "Book updated", data: updatedBook });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

// Route to delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

        return res.status(200).json({ message: 'Book deleted' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
});

export default router;
