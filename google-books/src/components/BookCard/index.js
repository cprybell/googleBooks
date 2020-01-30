import React from "react";
import { FormBtn } from "../Form";

// This file exports both the List and ListItem components

function BookCard(props) {
  return (
<div className="card" key={props.key}>
  <div className="card-body">
    <h5 className="card-title">Title: {props.title}</h5>
    <h6 className="card-subtitle mb-2 text-muted">By: {props.author}</h6>
    <p className="card-text">Synopsis: {props.synopsis}</p>
    <a href={props.link} className="card-link">Book Link</a>
  </div>
  <FormBtn onClick={props.onClickFunc}>Save Book!</FormBtn>
</div>
  );
}

export default BookCard;