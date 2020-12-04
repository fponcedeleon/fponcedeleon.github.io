import React from "react";
import imageMedia from "assets/images/undraw_browsing.svg";
import { Card } from "components/Card/index.tsx";
import "./welcome.css";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

export function Welcome() {
  const history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return (
    <div>
      <Card
        header={<h2>Bienvenido a Gerdau! 🎉</h2>}
        content={
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: "20px", color: "gray" }}>
              Empieza para poder registrar y dar seguimiento a máquinas!
            </div>
            <img
              src={imageMedia}
              style={{
                width: "100%",
                height: "250px",
                marginTop: "20px",
              }}
            />
          </div>
        }
        footer={
          <div>
            <Button onClick={() => handleClick()}> Empezar!</Button>
          </div>
        }
      />
    </div>
  );
}

export default Welcome;
