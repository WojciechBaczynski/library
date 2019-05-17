import React, { Component } from "react";
import axios from "axios";
import BookForm from "./BookForm";
import "./App.css";

class App extends Component {
  state = {
    books: [],
    bookToModify: null
  };

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    axios
      .get("/books")
      .then(({ data }) => {
        this.setState({ books: data });
      })
      .catch(err => console.log(err));
  };

  addNewBook = book => {
    axios
      .post("/books", book)
      .then(() => {
        this.fetchBooks();
      })
      .catch(err => console.log(err));
  };

  deleteBook = bookId => {
    axios
      .delete(`/books/${bookId}`)
      .then(() => {
        this.fetchBooks();
      })
      .catch(err => console.log(err));
  };

  passBookToEdit = book => {
    this.setState({ bookToModify: book });
  };

  modifyBook = book => {
    axios
      .put(`/books/${book.$loki}`, book)
      .then(() => {
        this.fetchBooks();
      })
      .catch(err => console.log(err));
  };

  handleFormSubmit = book => {
    if (book.$loki) {
      this.modifyBook(book);
    } else {
      this.addNewBook(book);
    }
  };

  render() {
    return (
      <div className="App">
        {this.state.books.map((book, index) => (
          <div key={index}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.ISBN}</p>
            <p>{book.pages}</p>
            <p>{book.rate}</p>
            <button
              onClick={() => {
                this.deleteBook(book.$loki);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                this.passBookToEdit(book);
              }}
            >
              modify
            </button>
          </div>
        ))}
        <BookForm
          handleSubmit={this.handleFormSubmit}
          bookToModify={this.state.bookToModify}
        />
      </div>
    );
  }
}

export default App;
