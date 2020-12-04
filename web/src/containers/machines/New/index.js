import React, { useState, useEffect } from "react";
import { createNewMachine } from "service/machine.js";
import { createNewComponents } from "service/component.js";
import { createNewPieces } from "service/piece.js";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Loading } from "components/Loading/index";
import { MachineForm } from "containers/machines/New/Forms/Machine";
import { ComponentForm } from "containers/machines/New/Forms/Component";
import { ComponentsTab } from "./componentsTab";
import moment from "moment";
import { PiecesTab } from "./piecesTab";
import { Header } from "components/Header";
import { Sidebar } from "components/Sidebar";

import useTranslate from "hooks/useTranslate";

export const NewMachine = () => {
  const initialComponentData = () => [{}];

  const t = useTranslate();
  const [randomKey, setRandomKey] = useState("");
  const [piecesdata, setPiecesData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [machine, setMachine] = useState({});
  const [components, setComponents] = useState([{}]);
  const [pieces, setPieces] = useState([{}]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [componentForms, setComponentForms] = useState([]);
  const [piecesForms, setPiecesForms] = useState([]);
  const machineMessages = "containers.machines.newMachine";

  const selectMessage = (value) => {
    return t(machineMessages.concat("." + value));
  };

  const machineChange = (prop, value) => {
    machine[prop] = value;
  };

  const componentsChange = (index, prop, value) => {
    components[index][prop] = value;
  };

  const piecesChange = (index, prop, value) => {
    pieces[index][prop] = value;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log(submitted);
      // only stores the populated components
      const cleanComponents = components.filter(
        (component) => component.internal_name
      );
      const cleanPieces = pieces.filter((piece) => piece.internal_name);
      const cleanMachine = { ...machine };
      cleanMachine.area = machine.area ? machine.area : null;
      cleanMachine.floor = machine.floor ? machine.floor : null;
      cleanMachine.maintenance_responsible = machine.maintenance_responsible
        ? machine.maintenance_responsible
        : null;
      cleanMachine.make = machine.make ? machine.make : null;
      cleanMachine.model = machine.model ? machine.model : null;
      cleanMachine.type = machine.type ? machine.type : null;
      cleanMachine.state = machine.state ? machine.state : null;
      cleanMachine.manufacturer = machine.manufacturer
        ? machine.manufacturer
        : null;
      cleanMachine.sublevel = machine.sublevel ? machine.sublevel : null;
      cleanMachine.working_from_date = moment(
        machine.working_from_date
      ).format();
      cleanMachine.last_maintenance_date = moment(
        machine.last_maintenance_date
      ).format();
      cleanMachine.next_maintenance_date = moment(
        machine.next_maintenance_date
      ).format();
      console.log("SUBMIT MACHINE", cleanMachine);
      cleanComponents.map((component) => {
        component.working_from_date = moment(
          component.working_from_date
        ).format();
      });
      console.log("SUBMIT COMPONENTS", cleanMachine);
      cleanPieces.map((piece) => {
        piece.working_from_date = moment(piece.working_from_date).format();
      });
      console.log("SUBMIT PIECES", cleanMachine);
      await createNewMachine(cleanMachine);
      await createNewComponents(cleanComponents);
      await createNewPieces(cleanPieces);
      setIsLoading(false);
      alert(selectMessage("createdSuccessfully"));
      setSubmitted(false);
    } catch (e) {
      alert(selectMessage("errorOnCreation"));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    submitted && handleSubmit();
  }, [submitted]);

  return (
    <Sidebar
      currentTab={selectedTab}
      setCurrentTab={(tab) => setSelectedTab(tab)}
    >
      <Header onSubmit={(e) => setSubmitted(e)} />
      <div>
        {selectedTab === 0 && (
          <MachineForm
            onChange={(p, v) => machineChange(p, v)}
            data={machine}
          />
        )}
        {selectedTab === 1 && (
          <ComponentsTab
            onChange={(i, p, v) => componentsChange(i, p, v)}
            data={components}
            setData={setComponents}
            machineData={machine}
          ></ComponentsTab>
        )}
        {selectedTab === 2 && (
          <PiecesTab
            onChange={(i, p, v) => piecesChange(i, p, v)}
            data={pieces}
            setData={setPieces}
            machineData={machine}
            componentsData={components}
          ></PiecesTab>
        )}
      </div>
      <Header onSubmit={(e) => setSubmitted(e)} />
    </Sidebar>
  );
};
export default NewMachine;
