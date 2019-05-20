const express = require("express");
const bodyParser = require("body-parser");
const loki = require("lokijs");
const app = express();
app.use(bodyParser.json());
const port = 8000;

var db = new loki("data.json", { autosave: true });
var books = db.addCollection("books");
books.insert({
  title: "Harry Potter",
  author: "J.K. Rowling",
  ISBN: 1000000000000,
  pages: 500,
  rate: 4
});

app.get("/", (req, res) => res.send("Library books api"));

app.get("/books", (req, res) => {
  res.status = 200;
  res.send(books.data);
});

app.get("/books/:id", (req, res) => {
  const book = books.get(req.params.id);
  res.status = 200;
  res.send(book ? book : { error: "no books matching id" });
});

app.post("/books", (req, res) => {
  const book = req.body;
  if (book && book.ISBN.toString().length === 13) {
    books.insert(book);
    res.status = 201;
    res.send(book);
  } else {
    res.status = 500;
    res.send({ error: "invalid data" });
  }
});

app.delete("/books/:id", (req, res) => {
  const book = books.get(req.params.id);
  const result = books.remove(book);
  res.status = 410;
  res.send(result);
});

app.put("/books/:id", (req, res) => {
  const book = req.body;
  const bookToUpdate = books.findOne({ $loki: +req.params.id });
  const newBook = updateBook(book, bookToUpdate);
  books.update(newBook);
  res.status = 201;
  res.send(newBook);
});

function updateBook(book, bookToUpdate) {
  var updatedBook = { ...bookToUpdate };
  Object.keys(updatedBook).forEach(property => {
    if (
      book.hasOwnProperty(property) &&
      updatedBook.hasOwnProperty(property) &&
      property !== "$loki" &&
      property !== "meta"
    ) {
      updatedBook[property] = book[property];
    }
  });
  return updatedBook;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
