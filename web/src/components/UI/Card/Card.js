import React from "react";
import { Card } from "react-bootstrap";

export const CardComponent = ({ id, header, title, body, onClick }) => (
  <Card
    value={id}
    className="item"
    border="primary"
    style={{
      width: "22rem",
      float: "left",
      alignItems: "left",
      justifyContent: "flex-start",
    }}
    onClick={(e) => onClick && onClick(id)}
  >
    <Card.Header>{header}</Card.Header>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{body}</Card.Text>
    </Card.Body>
  </Card>
);
