import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import BookCard from "../components/BookCard";

class Saved extends Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Books</h1>
            </Jumbotron>
            {this.state.books.length ? (
                this.state.books.map(book => (
                    <div>
                    <BookCard
                        key={book.Id}
                        title={book.title}
                        author={book.author}
                        synopsis={book.description}
                        link={book.link}
                        onClickFunc={() => this.deleteBook(book._id)}
                        
                    >
                    </BookCard>
                    <p>Book ID: {book.id}</p>
                    </div>                    

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

export default Saved;
