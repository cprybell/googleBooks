import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import BookCard from "../components/BookCard";

class Books extends Component {
  state = {
    books: [],
    title :  ''
  };

  componentDidMount() {
    //this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchBook(
        this.state.title
      )
        .then((res) => this.setState({ books : res.data.items}))
        .catch(err => console.log(err));
    }
  };

  handleSave = book => {
    let data = {
      title : book.volumeInfo.title,
      author : book.volumeInfo.authors[0],
      description : book.volumeInfo.description,
      image : book.volumeInfo.imageLinks.medium,
      link : book.volumeInfo.canonicalVolumeLink
    }
    API.saveBook(data).then();
  }

  render() {
    let buttonName = "Save Book!";
    let styleButton = "btn btn-success";
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Google Book Search!</h1>
              <h2>Search by book titles using the search bar below.</h2>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Book Title (ex. The Shining)" value={this.state.title} onChange={this.handleInputChange}/>
              <FormBtn onClick={this.handleFormSubmit} buttonStyle={styleButton}>Search Book</FormBtn>
            </form>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>Books Found</h1>
            </Jumbotron>
            {this.state.books.length ? (
                this.state.books.map(book => (
                  <BookCard
                    key={book.Id}
                    title={book.volumeInfo.title}
                    author={book.volumeInfo.authors[0]}
                    synopsis={book.volumeInfo.description}
                    link={book.volumeInfo.canonicalVolumeLink}
                    onClickFunc={() => this.handleSave(book)}
                    buttonTitle={buttonName}
                    buttonStyle={styleButton}
                  >
                  </BookCard>
                )
              )
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
