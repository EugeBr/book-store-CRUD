const { Schema, model } = require('mongoose');
//*require schema and model from mongoose

const bookSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: String,
    author: {
        name: String,
        lastName: String,
        nationality: String,
        pictureUrl: String
    },
    rating: {
        type: Number,
        min: 0,
        max: 10
    }
});

const Book = model('book', bookSchema);
//*set name of model and pass the schema

module.exports = Book;