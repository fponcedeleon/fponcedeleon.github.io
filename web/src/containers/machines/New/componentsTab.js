import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { ComponentForm } from "containers/machines/New/Forms/Component";
import { Collapse } from "components/Collapse/index";
import { Loading } from "components/Loading/index";
import useTranslate from "hooks/useTranslate";

export const ComponentsTab = ({ onChange, data, setData, machineData }) => {
  const setInitialComponent = () => {
    console.log("initial", data);
    return data;
  };

  const [components, setComponents] = useState(setInitialComponent());
  const [forceRerender, setForceRerender] = useState(false);
  const machineMessages = "containers.machines.newMachine";
  const t = useTranslate();

  const selectMessage = (value) => {
    return t(machineMessages.concat("." + value));
  };

  useEffect(() => {
    setComponents(data);
  }, [data]);

  const deleteHandler = (index) => {
    if (window.confirm(selectMessage("deleteComponentConfirmation"))) {
      const componentList = [...components];
      componentList.splice(index, 1);
      setData(componentList);
      setForceRerender(true);
    }
  };

  const addComponentForm = () => {
    console.log("componentes before setting", components);
    setData([...components, {}]);
    console.log("data after setting", data);
  };

  const setComponentsData = () =>
    components &&
    components.map((component, index) => (
      <>
        <div style={{ marginBottom: "20px", overflowX: "scroll" }}>
          <ComponentForm
            index={index}
            onChange={onChange}
            data={data[index]}
            machineData={machineData}
          />
        </div>
      </>
    ));

  return (
    <Container>
      <div>
        <h2>Componentes</h2>
        <hr />
      </div>
      <Collapse
        childrens={setComponentsData()}
        onDelete={(index) => deleteHandler(index)}
        onChangeHeader={(i, v, e) => onChange(i, v, e)}
        headerPlaceholder={"Ingresar nombre interno del Componente"}
        data={components}
        title={"Componente"}
      />
      <Row className="justify-content-md-between mt-5 mb-5">
        <Button type="primary" onClick={() => addComponentForm()}>
          Agregar Componente
        </Button>
      </Row>
    </Container>
  );
};
