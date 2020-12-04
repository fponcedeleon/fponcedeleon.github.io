import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { getAllMachines } from "service/machine";
import { CardComponent } from "components/UI/Card/index";
import { Loading } from "components/Loading/index";
import { useHistory } from "react-router-dom";
import useTranslate from "hooks/useTranslate";
import "./list.css";

const App = ({ data }) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/machine/detail/${id}`);
  };

  const displayBody = (machine) => {
    return (
      <div className="CardContent">
        <div className="location">
          <div style={{ marginBottom: "15px" }}>
            {" "}
            <span style={{ fontWeight: "bold", marginBottom: "15px" }}>
              Planta:{" "}
            </span>{" "}
            {machine.plant}
          </div>
          <div style={{ marginBottom: "15px" }}>
            {" "}
            <span style={{ fontWeight: "bold", marginBottom: "15px" }}>
              Area:
            </span>{" "}
            {machine.area}
          </div>
          <div style={{ marginBottom: "15px" }}>
            {" "}
            <span style={{ fontWeight: "bold", marginBottom: "15px" }}>
              Subnivel:{" "}
            </span>{" "}
            {machine.sublevel}
          </div>
        </div>

        <div className="description">{machine.description}</div>
        <div
          className="state"
          style={{
            backgroundColor: selectBackground(machine.state),
            color: "white",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {machine.state}
        </div>
      </div>
    );
  };
  const selectBackground = (state) => {
    let color = "";
    switch (state) {
      case "Producción":
        console.log("prod");
        color = "#3E772D";
        break;
      case "Mantenimiento":
        color = "#D68C0B";
        break;
      case "Detenida":
        color = "#A2331A";
        break;
    }
    return color;
  };
  return (
    <div>
      <Container fluid>
        <Row className="dispay-flex justify-content-md-center">
          <div className="ListContainer">
            {data.map((machine, index) => (
              <CardComponent
                id={machine.id}
                className="item"
                onClick={(e) => handleClick(e)}
                key={index}
                title={machine.name}
                body={displayBody(machine)}
              />
            ))}
          </div>
        </Row>
      </Container>
    </div>
  );
};

const ListMachines = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslate();

  useEffect(() => {
    // const res = [
    //   {
    //     id: 1,
    //     name: "Maquina de cortar",
    //     installed: "true",
    //     lastMaintenanceDate: new Date(),
    //     state: "Producción",
    //     type: "Hidraúlica",
    //     faults: 0,
    //     plant: "Montevideo",
    //     area: "Transformaciones en frio",
    //     sublevel: "Endereazado",
    //     description:
    //       "Máquina que sirve para cortar el acero y luego mandarlo a enfriar. Es única",
    //   },
    //   {
    //     id: 2,
    //     name: "Maquina de enderezar",
    //     installed: "true",
    //     lastMaintenanceDate: new Date(),
    //     state: "Producción",
    //     type: "Mecánica",
    //     faults: 1,
    //     plant: "Montevideo",
    //     area: "Transformaciones en frio",
    //     sublevel: "Endereazado",
    //     description:
    //       "Máquina que sirve para cortar el acero y luego mandarlo a enfriar. Es única",
    //   },
    //   {
    //     id: 3,
    //     name: "Maquina de enfriar",
    //     installed: "true",
    //     lastMaintenanceDate: new Date(),
    //     state: "Producción",
    //     type: "Mecánica",
    //     make: "Thompson",
    //     faults: 2,
    //     plant: "Montevideo",
    //     area: "Transformaciones en frio",
    //     sublevel: "Endereazado",
    //     description:
    //       "Máquina que sirve para cortar el acero y luego mandarlo a enfriar. Es única",
    //   },
    //   {
    //     id: 4,
    //     name: "Maquina de cortar",
    //     installed: "true",
    //     lastMaintenanceDate: new Date(),
    //     state: "Mantenimiento",
    //     type: "Mecánica",
    //     make: "Thompson",
    //     faults: 1,
    //     plant: "Montevideo",
    //     area: "Transformaciones en frio",
    //     sublevel: "Endereazado",
    //     description:
    //       "Máquina que sirve para cortar el acero y luego mandarlo a enfriar. Es única",
    //   },
    //   {
    //     id: 5,
    //     name: "Maquina de enderezar",
    //     installed: "true",
    //     lastMaintenanceDate: new Date(),
    //     state: "Producción",
    //     type: "Mecánica",
    //     make: "Ford",
    //     faults: 0,
    //     plant: "Montevideo",
    //     area: "Transformaciones en frio",
    //     sublevel: "Endereazado",
    //     description:
    //       "Máquina que sirve para cortar el acero y luego mandarlo a enfriar. Es única",
    //   },
    //   {
    //     id: 6,
    //     name: "Maquina de enderezar",
    //     installed: "true",
    //     lastMaintenanceDate: new Date(),
    //     state: "Detenida",
    //     type: "Mecánica",
    //     make: "Thompson",
    //     plant: "Montevideo",
    //     area: "Transformaciones en frio",
    //     sublevel: "Endereazado",
    //     description:
    //       "Máquina que sirve para cortar el acero y luego mandarlo a enfriar. Es única",
    //     faults: 0,
    //   },
    // ];

    if (!data.length) {
      getAllMachines()
        .then((res) => {
          setData(res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const getApp = () => {
    if (isLoading) {
      return <Loading />
    }
    if (data.length) {
      return <App data={data} />;
    }
    return (
      <div>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs={{ span: 2 }}>
              {t("containers.machines.list.noDataReturned")}
            </Col>
          </Row>
        </Container>
      </div>
    );
  };

  return <div>{getApp()}</div>;
};

export default ListMachines;
