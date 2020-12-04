import React, { useState, useEffect } from "react";
import { TextArea } from "components/TextArea";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { FileFrame } from "components/FileFrame/FileFrame.tsx";
import { DatePicker } from "components/UI/DatePicker/index";
import { ModalComponent } from "components/Modal/Modal";
import InnerImageZoom from "react-inner-image-zoom";
import useTranslate from "hooks/useTranslate";
import PDFViewer from "pdf-viewer-reactjs";

export const ComponentForm = ({ onChange, index, data, machineData }) => {
  const initialData = () => {
    console.log("data", data);
    console.log("index", index);
    return data;
  };
  const [componentData, setComponentData] = useState(initialData());
  const [machine, setMachine] = useState(machineData);
  const [randomKey, setRandomKey] = useState("");
  const [files, setFiles] = useState(componentData["files"] || []);
  const [users, setUsers] = useState([]);
  const [state, setState] = useState([]);
  const [states, setStates] = useState([]);
  const [manufacturerType, setManufacturerType] = useState(null);
  const [manufacturerTypes, setManufacturerTypes] = useState([]);
  const [maintenanceResponsible, setMaintenanceResponsible] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [providers, setProviders] = useState([]);
  const [provider, setProvider] = useState([]);
  const [componentTypes, setComponentTypes] = useState([]);
  const [type, setType] = useState(null);
  const [workingSinceDate, setWorkingSinceDate] = useState(
    (componentData["working_from_date"] &&
      new Date(componentData["working_from_date"])) ||
      new Date()
  );
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const machineMessages = "containers.machines.newMachine";
  const t = useTranslate();
  useEffect(() => {
    // set initial key
    if (!randomKey) {
      setRandomKey(Math.random().toString(36));
    }
  }, [randomKey]);

  const selectMessage = (value) => {
    return t(machineMessages.concat("." + value));
  };

  const handleSelectDate = (prop, date) => {
    onChange(index, prop, date);
    setWorkingSinceDate(date);
  };

  const saveMachine = () => onChange(index, "machine", machine.serie_number);
  useEffect(() => {
    setComponentData(data);
  }, [data]);

  useEffect(() => {
    if (!users.length) {
      setUsers([
        { name: "Federico", id: "1" },
        { name: "Santiago", id: "2" },
        { name: "Pedro", id: "3" },
        { name: "Pablo", id: "4" },
      ]);
      onChange(index, "maintenance_responsible", users[0]);
    }
    if (!manufacturers.length) {
      setManufacturers([
        { name: "Fabricante 1", id: "1" },
        { name: "Fabricante 2", id: "2" },
        { name: "Fabricante 3", id: "3" },
      ]);
      onChange(index, "manufacturer", manufacturers[0]);
    }
    if (!states.length) {
      setStates([
        { name: "Producción", id: "1" },
        { name: "Mantenimiento", id: "2" },
        { name: "Fuera de uso", id: "3" },
      ]);
      setState(states[0]);
    }
    if (!providers.length) {
      setProviders([
        { name: "Proveedor 1", id: "1" },
        { name: "Proveedor 2", id: "2" },
        { name: "Proveedor 3", id: "3" },
      ]);
      onChange(index, "provider", providers[0]);
    }
    if (!manufacturerTypes.length) {
      setManufacturerTypes([
        { name: "Original", id: "1" },
        { name: "Según Plano", id: "2" },
      ]);
      setManufacturerType(manufacturerTypes[0]);
    }

    if (!componentTypes.length) {
      setComponentTypes([
        { name: "Hidráulico", id: "1" },
        { name: "Mecánico", id: "2" },
        { name: "Neumático", id: "3" },
        { name: "Eléctrico", id: "4" },
      ]);
      onChange(index, "type", componentTypes[0]);
    }
    saveMachine();
  }, [
    manufacturers,
    users,
    manufacturerTypes,
    providers,
    states,
    componentTypes,
  ]);

  useEffect(() => {
    setMachine(machineData);
  }, [machineData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const ext =
      file && file.name && file.name.substr(file.name.lastIndexOf(".") + 1);
    const type = ext === "pdf" ? "pdf" : "image";
    const cleanFile = {
      name: file.name,
      type: type,
      url: URL.createObjectURL(file),
    };
    files && setFiles([...files, cleanFile]);
    onChange(index, "files", [...files, cleanFile]);
  };

  const removeFile = (indexFile) => {
    const fileList = [...files];
    fileList.splice(indexFile, 1);
    setFiles(fileList);
    setRandomKey(Math.random().toString(36));
  };

  const onClick = (file) => {
    setSelectedFile(file);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const displayModalContent = (file) => {
    let content;
    switch (file.type) {
      case "image":
        content = (
          <InnerImageZoom
            style={{ maxHeight: "80vh" }}
            src={selectedFile.url}
            zoomSrc={selectedFile.url}
            fullscreenOnMobile={true}
            moveType="drag"
          />
        );
        break;
      case "pdf":
        content = (
          <div>
            <PDFViewer
              document={{
                url: file.url,
              }}
              hideRotation={true}
            />
          </div>
        );
        break;
    }
    return content;
  };
  console.log("componentData", componentData);
  return (
    <Container>
      <Form.Group controlId="internal_name" className="mt-4">
        <Form.Label>*Nombre Interno</Form.Label>
        <Form.Control
          required
          type="text"
          value={componentData["internal_name"]}
          placeholder="Ingresar nombre"
          onChange={(e) => onChange(index, "internal_name", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="machine_id" className="mt-4">
        <Form.Label>Máquina</Form.Label>
        <Form.Control
          required
          type="text"
          readOnly
          value={machine["internal_name"] ? machine["internal_name"] : ""}
          placeholder="No hay máquina asociada aún"
          onChange={(e) => onChange(index, "machine_id", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="serieNumber" className="mt-4">
        <Form.Label>*{selectMessage("serieNumber")}</Form.Label>
        <Form.Control
          required
          type="text"
          value={componentData["serie_number"]}
          placeholder="Ingrese el número de serie"
          onChange={(e) => onChange(index, "serie_number", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="make" className="mt-4">
        <Form.Label>*{selectMessage("make")}</Form.Label>
        <Form.Control
          required
          type="text"
          value={componentData["make"]}
          placeholder="Ingrese la marca del componente"
          onChange={(e) => onChange(index, "make", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="model" className="mt-4">
        <Form.Label>*{selectMessage("model")}</Form.Label>
        <Form.Control
          required
          type="text"
          value={componentData["model"]}
          placeholder="Ingrese el modelo marca de la máquina"
          onChange={(e) => onChange(index, "model", e.target.value)}
        />
        <Form.Group controlId="type" className="mt-4">
          <Form.Label>Tipo de Componente</Form.Label>
          <Form.Control
            as="select"
            placeholder={"Seleccionar tipo de componente"}
            onChange={(event) => onChange(index, "type", event.target.value)}
          >
            {componentTypes.map((u, i) => (
              <option key={i} value={u.id}>
                {u.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="state" className="mt-4">
          <Form.Label>*{selectMessage("state")}</Form.Label>
          <Form.Control
            as="select"
            placeholder={"Seleccionar estado"}
            onChange={(e) => onChange(index, "state", e.target.value)}
          >
            {states.map((u, i) => (
              <option key={i} value={u.id}>
                {u.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="description" className="mt-4">
          <Form.Label>*Descripción</Form.Label>
          <TextArea
            name="description"
            rows={4}
            value={componentData["description"]}
            placeholder={"Descripción"}
            onChange={(e) => onChange(index, "description", e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="manufacturerType" className="mt-4">
          <Form.Label>*{selectMessage("manufacturerType")}</Form.Label>
          <br />
          <Form.Control
            as="select"
            onChange={(e) =>
              onChange(index, "manufacturer_type", e.target.value)
            }
          >
            {manufacturerTypes.map((u, i) => (
              <option key={i} value={u.id}>
                {u.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="workingSinceDate" className="mt-4">
          <Form.Label>*Fecha de Colocación</Form.Label>
          <br />
          <DatePicker
            date={workingSinceDate}
            onChange={(date) => handleSelectDate("working_from_date", date)}
          />
        </Form.Group>
      </Form.Group>
      <Form.Group controlId="maintenanceResponsible" className="mt-4">
        <Form.Label>*{selectMessage("maintenanceResponsible")}</Form.Label>
        <br />
        <Form.Control
          as="select"
          onChange={(event) =>
            onChange(index, "maintenance_responsible", event.target.value)
          }
        >
          {users.map((u, i) => (
            <option key={i} value={u.id}>
              {u.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="manufacturer" className="mt-4">
        <Form.Label>{selectMessage("manufacturer")}</Form.Label>
        <br />
        <Form.Control
          as="select"
          onChange={(event) =>
            onChange(index, "manufacturer", event.target.value)
          }
        >
          {manufacturers.map((p, i) => (
            <option key={i} value={p.id}>
              {p.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="provider" className="mt-4">
        <Form.Label>*{selectMessage("provider")}</Form.Label>
        <br />
        <Form.Control
          as="select"
          onChange={(event) => onChange(index, "provider", event.target.value)}
        >
          {providers.map((u, i) => (
            <option key={i} value={u.id}>
              {u.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="planId" className="mt-4">
        <Form.Label>{selectMessage("planId")}</Form.Label>
        <Form.Control
          required
          value={componentData["flat_number"]}
          type="text"
          placeholder="Ingrese el número de plano del componente"
          onChange={(e) => onChange(index, "flat_number", e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="relevant_data" className="mt-4">
        <Form.Label>{selectMessage("moreInfo")}</Form.Label>
        <TextArea
          name="relevant_data"
          rows={4}
          value={componentData["relevant_data"]}
          placeholder={"Otros datos relevantes"}
          onChange={(e) => onChange(index, "relevant_data", e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="files" className="mt-4">
        <Form.Label>*Archivos Adjuntos del Componente</Form.Label>
        <Form.Control
          key={randomKey}
          type="file"
          placeholder="Máquina 1"
          onChange={handleFileUpload}
        />
      </Form.Group>
      <Row>
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
          }}
        >
          {files &&
            files.map((file, index) => (
              <>
                <FileFrame
                  key={index}
                  file={file}
                  onClick={() => onClick(file)}
                  onClose={() => removeFile(index)}
                />
              </>
            ))}

          <ModalComponent
            show={showModal}
            onClose={closeModal}
            children={displayModalContent(selectedFile)}
          />
        </div>
      </Row>
    </Container>
  );
};
