import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoutes from './routes/booksRoutes.js'
import cors from 'cors';
import 'dotenv/config'

const app = express();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome to BookStore");
});


app.use('/books', booksRoutes);

mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("App connection established");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });
