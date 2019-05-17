import React, { Component } from "react";

class BookForm extends Component {
  state = {
    title: null,
    author: null,
    ISBN: null,
    pages: null,
    rate: null
  };

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(props) {
    this.checkIfModify(props);
  }

  checkIfModify = props => {
    if (props.bookToModify) {
      console.log(props);
      this.setState({ ...props.bookToModify });
    }
  };

  render() {
    return (
      <div>
        <input
          name="title"
          onChange={this.handleOnChange}
          type="text"
          placeholder="title"
          value={this.state.title}
        />
        <input
          name="author"
          onChange={this.handleOnChange}
          type="text"
          placeholder="author"
          value={this.state.author}
        />
        <input
          name="ISBN"
          onChange={this.handleOnChange}
          type="number"
          placeholder="ISBN"
          value={this.state.ISBN}
        />
        <input
          name="pages"
          onChange={this.handleOnChange}
          type="number"
          placeholder="pages"
          value={this.state.pages}
        />
        <input
          name="rate"
          onChange={this.handleOnChange}
          type="number"
          placeholder="rate"
          value={this.state.rate}
        />
        <button
          onClick={() => {
            this.props.handleSubmit(this.state);
          }}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default BookForm;
