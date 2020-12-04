import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { Card, Button, Form } from "react-bootstrap";
import { CaretRight, CaretDown } from "../UI/Dropdown/index";

const CustomToggle = ({ children, eventKey }) => {
  const [isOpen, setIsOpen] = useState(false);
  const decoratedOnClick = useAccordionToggle(eventKey, () => {
    setIsOpen(!isOpen);
    // console.log("totally custom!");
  });

  return (
    <div
      onClick={decoratedOnClick}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {isOpen ? (
        <CaretDown
          size="2x"
          style={{ transition: "opacity 700ms ease-in", marginRight: "8px" }}
        />
      ) : (
        <CaretRight
          size="2x"
          style={{ transition: "opacity 700ms ease-in", marginRight: "13px" }}
        />
      )}
      {children}
    </div>
  );
};

export const Collapse = ({
  childrens,
  onDelete,
  onChangeHeader,
  headerPlaceholder,
  data,
  title,
}) => {
  const [components, setComponents] = useState(data);
  const [forms, setForms] = useState(childrens);
  useEffect(() => {
    setComponents(data);
  }, [data]);

  useEffect(() => {
    setForms(childrens);
  }, [childrens]);

  console.log(components);
  return (
    <Accordion>
      {forms.map((c, index) => (
        <Card key={index}>
          <Card.Header>
            <CustomToggle eventKey={`${index}`}>
              <div
                style={{
                  width: "70%",
                  display: "flex",
                }}
              >
                <span style={{ marginRight: "30px" }}>
                  {" "}
                  {title} {index + 1}
                </span>
              </div>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  onClick={() => onDelete(index)}
                  variant="outline-danger"
                  size="sm"
                >
                  Eliminar
                </Button>
              </div>
            </CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey={`${index}`}>
            <Card.Body>{c}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};
