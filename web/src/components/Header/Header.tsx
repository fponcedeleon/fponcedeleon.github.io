import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

interface IProps {
  onSubmit: Function;
  title: String;
}

export const Header = ({ title, onSubmit }: IProps) => {
  return (
    <div className="HeaderContainer">
      {/* <div className="HeaderTitle">{title}</div> */}

      <button className="HeaderButton" onClick={() => onSubmit(true)}>
        Guardar
      </button>
    </div>
  );
};
