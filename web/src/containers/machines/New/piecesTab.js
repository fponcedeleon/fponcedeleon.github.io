import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { PieceForm } from "containers/machines/New/Forms/Piece";
import { Collapse } from "components/Collapse/index";
import { Loading } from "components/Loading/index";
import useTranslate from "hooks/useTranslate";

export const PiecesTab = ({
  onChange,
  data,
  setData,
  machineData,
  componentsData,
}) => {
  const setInitialPiece = () => {
    console.log("initial", data);
    return data;
  };

  const [pieces, setPieces] = useState(setInitialPiece());
  const [forceRerender, setForceRerender] = useState(false);
  const machineMessages = "containers.machines.newMachine";
  const t = useTranslate();

  const selectMessage = (value) => {
    return t(machineMessages.concat("." + value));
  };

  useEffect(() => {
    setPieces(data);
  }, [data]);

  const deleteHandler = (index) => {
    if (window.confirm(selectMessage("deleteComponentConfirmation"))) {
      const piecesList = [...pieces];
      piecesList.splice(index, 1);
      setData(piecesList);
      setForceRerender(true);
    }
  };

  const addPieceForm = () => {
    console.log("pieces before setting", pieces);
    setData([...pieces, {}]);
    console.log("data after setting", data);
  };

  const setPiecesData = () =>
    pieces &&
    pieces.map((piece, index) => (
      <>
        <div style={{ marginBottom: "20px", overflowX: "scroll" }}>
          <PieceForm
            index={index}
            onChange={onChange}
            data={data[index]}
            machineData={machineData}
            componentsData={componentsData}
          />
        </div>
      </>
    ));

  return (
    <Container>
      <div>
        <h2>Piezas</h2>
        <hr />
      </div>
      <Collapse
        childrens={setPiecesData()}
        onDelete={(index) => deleteHandler(index)}
        onChangeHeader={(i, v, e) => onChange(i, v, e)}
        headerPlaceholder={"Ingresar nombre interno de la Pieza"}
        data={pieces}
        title={"Pieza"}
      />
      <Row className="justify-content-md-between mt-5 mb-5">
        <Button type="primary" onClick={() => addPieceForm()}>
          Agregar Pieza
        </Button>
      </Row>
    </Container>
  );
};
