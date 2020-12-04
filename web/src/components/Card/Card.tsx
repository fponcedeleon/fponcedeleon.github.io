import React from "react";
import "./Card.css";

interface IProps {
  header: any;
  content: any;
  footer: any;
}

export const Card = ({ header, content, footer }: IProps) => {
  return (
    <div className="CardContainer">
      <div className="Header">{header}</div>
      <div className="CardContent">{content}</div>
      <div className="Footer">{footer}</div>
    </div>
  );
};
