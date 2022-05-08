const Book = require('../models/Book.model'); //*require model
const books = require('../data/books'); //*require data
const mongoose = require('mongoose');
require('../db');

const bookSeed = async () => {
    try {
        await Book.deleteMany();
        const createdBooks = await Book.create(books);
        console.log(`${createdBooks.length} books created`);
        await mongoose.connection.close();
    } catch(error) {
        console.error(error);
    }
}

bookSeed();