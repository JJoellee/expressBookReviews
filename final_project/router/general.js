const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');



// Get the book list available in the shop
public_users.get('/', function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    res.send(JSON.stringify(book, null, 4));
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const filteredBooks = Object.values(books).filter(book => book.author === author);
  if (filteredBooks.length > 0) {
    res.send(JSON.stringify(filteredBooks, null, 4));
  } else {
    res.status(404).json({ message: "Books not found for the given author" });
  }
});


// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const filteredBooks = Object.values(books).filter(book => book.title === title);
  if (filteredBooks.length > 0) {
    res.send(JSON.stringify(filteredBooks, null, 4));
  } else {
    res.status(404).json({ message: "Books not found for the given title" });
  }
});


//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.send(JSON.stringify(book.reviews, null, 4));
  } else {
    res.status(404).json({ message: "Reviews not found for the given ISBN" });
  }
});

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  res.status(200).json({ message: "User successfully registered. Now you can login" });
});


// Task 10: Get the book list available in the shop
public_users.get('/', async (req, res) => {
  try {
    // Simulate an API call to get the books
    const response = await axios.get('https://joelleelhoms-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/books'); 
    res.send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error fetching book list" });
  }
});

// Task 11: Get book details based on ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
  const isbn = req.params.isbn;
  try {
    // Simulate an API call to get the book by ISBN
    const response = await axios.get(`https://joelleelhoms-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/books/isbn/${isbn}`);
    res.send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
});

// Task 12: Get book details based on author
public_users.get('/author/:author', async (req, res) => {
  const author = req.params.author;
  try {
    // Simulate an API call to get the books by author
    const response = await axios.get(`http://localhost:5000/books/author/${author}`);
    res.send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(404).json({ message: "Books not found for the given author" });
  }
});

// Task 13: Get book details based on title
public_users.get('/title/:title', async (req, res) => {
  const title = req.params.title;
  try {
    // Simulate an API call to get the books by title
    const response = await axios.get(`http://localhost:5000/books/title/${title}`);
    res.send(JSON.stringify(response.data, null, 4));
  } catch (error) {
    res.status(404).json({ message: "Books not found for the given title" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book && book.reviews) {
    res.send(JSON.stringify(book.reviews, null, 4));
  } else {
    res.status(404).json({ message: "Reviews not found for the given ISBN" });
  }
});

public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  res.status(200).json({ message: "User successfully registered. Now you can login" });
});

module.exports.general = public_users;
