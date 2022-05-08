const res = require('express/lib/response');
const Book = require('../models/Book.model'); //*require model
const router = require('express').Router(); //*require router

router.get('/', async (req, res, next) => { //*we get only '/' because we setted a prefix
    try {
        const books = await Book.find();
        res.render('books/books-list', { books }); //!must be always an object
    } catch (error) {
        next(error);
    }
})

router.get('/create', (req, res, next) => {
    res.render('books/books-create');
})

router.post('/create', async (req, res, next) => {
    try {
        // TODO create book
        const { title, description, name, lastName, nationality, pictureUrl, rating } = req.body;
        await Book.create({
            title,
            description,
            author: {
                name,
                lastName,
                nationality,
                pictureUrl
            },
            rating
        })
        res.redirect('/books');
    } catch(error) {
        next(error);
    }
})

router.get('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.render('books/books-edit', book);
    }catch(error) {
        next(error);
    }
})

router.post('/:id/edit', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, name, lastName, nationality, pictureUrl, rating } = req.body;
        await Book.findByIdAndUpdate(id, 
            {
            title,
            description,
            author: {
                name,
                lastName,
                nationality,
                pictureUrl
            },
            rating
            },
            {
            new: true
            }); //*this is needed to get the new values
            res.redirect('/books');
    }catch(error) {
        next(error);
    }
})

router.post('/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Book.findByIdAndDelete(id);

        res.redirect('/books');
    }catch(error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => { //!put more specific router last
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        res.render('books/book-details', book); //*'book' is already an object
    } catch(error) {
        next(error);  
    }
})

module.exports = router; //!export router