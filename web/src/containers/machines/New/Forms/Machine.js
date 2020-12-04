import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { Loading } from "components/Loading/index";
import { DatePicker } from "components/UI/DatePicker/index";
import { getAllUsers } from "service/users.js";
import { getAllFloors } from "service/floor.js";
import { getAllAreas } from "service/area.js";
import { getAllSublevels } from "service/sublevel.js";
import { getAllManufacturers } from "service/manufacturers.js";
import { getAllMakes } from "service/make.js";
import { getAllModels } from "service/model.js";
import { TextArea } from "components/TextArea";
import { FileFrame } from "components/FileFrame/FileFrame.tsx";
import { ModalComponent } from "components/Modal/Modal";
import InnerImageZoom from "react-inner-image-zoom";
import PDFViewer from "pdf-viewer-reactjs";
import useTranslate from "hooks/useTranslate";

export const MachineForm = ({ data, onChange }) => {
  const t = useTranslate();

  const selectedField = (elements, value) => {
    let matchedData = null;
    if (value) {
      const lowercasedValue = value.toLowerCase().trim();
      matchedData = elements.filter((item) => {
        return Object.keys(item).some((key) => {
          return ["id"].includes(key) && item[key].toString().toLowerCase().includes(lowercasedValue)
        });
      });

      return matchedData[0];
    }

    return matchedData;
  };

  const [machineData, setMachineData] = useState(data);
  const [internalName, setInternalName] = useState(machineData["internal_name"]);
  const [serieNumber, setSerieNumber] = useState(machineData["serie_number"]);
  const [makes, setMakes] = useState([]);
  const [make, setMake] = useState(machineData["make"]);
  const [models, setModels] = useState([]);
  const [model, setModel] = useState(machineData["model"]);
  const [floors, setFloors] = useState([]);
  const [floor, setFloor] = useState(machineData["floor"]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState(machineData["area"]);
  const [states, setStates] = useState([]);
  const [state, setState] = useState(machineData["state"]);
  const [description, setDescription] = useState(machineData["description"]);
  const [flatNumber, setFlatNumber] = useState(machineData["flat_number"]);
  const [purchaseNumber, setPurchaseNumber] = useState(machineData["purchase_number"]);
  const [manufacturerTypes, setManufacturerTypes] = useState([]);
  const [manufacturerType, setManufacturerType] = useState(machineData["manufacturer_type"]);
  const [maintenanceResponsible, setMaintenanceResponsible] = useState(machineData["maintenance_responsible"]);
  const [manufacturers, setManufacturers] = useState([]);
  const [manufacturer, setManufacturer] = useState(machineData["manufacturer"]);
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState(
    (machineData["last_maintenance_date"] &&
      new Date(machineData["last_maintenance_date"])) ||
      new Date()
  );
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState(
    (machineData["next_maintenance_date"] &&
      new Date(machineData["next_maintenance_date"])) ||
      new Date()
  );
  const [machineTypes, setMachineTypes] = useState([]);
  const [type, setType] = useState(machineData["type"]);
  const [workingFromDate, setWorkingFromDate] = useState(
    (machineData["working_from_date"] &&
      new Date(machineData["working_from_date"])) ||
      new Date()
  );
  const [files, setFiles] = useState(machineData["files"] || []);
  const [relevantData, setRelevantData] = useState(machineData["relevant_data"]);

  const [sublevel, setSublevel] = useState(machineData["sublevel"]);
  
  
  const [isLoading, setIsLoading] = useState(false);
  
  
  
  const [forceRerender, setForceRerender] = useState(false);
  const [users, setUsers] = useState([]);
  
  
  
  
  const [sublevels, setSublevels] = useState([]);
  
  
  const [randomKey, setRandomKey] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});

  const machineMessages = "containers.machines.newMachine";

  const selectMessage = (value) => {
    return t(machineMessages.concat("." + value));
  };
  useEffect(() => {
    // set initial key
    if (!randomKey) {
      setRandomKey(Math.random().toString(36));
    }
  }, [randomKey]);

  useEffect(() => {
    setMachineData(data);
  }, [data]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const ext =
      file && file.name && file.name.substr(file.name.lastIndexOf(".") + 1);
    console.log(ext);
    const type = ["pdf", "csv", "docx"].indexOf(ext) !== -1 ? ext : "image";
    const cleanFile = {
      name: file.name,
      type: type,
      url: URL.createObjectURL(file),
    };
    files && setFiles([...files, cleanFile]);
    onChange("files", [...files, cleanFile]);
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

  useEffect(() => {
    if (forceRerender) {
      setForceRerender(false);
    }
    if (!users.length) {
      getAllUsers()
        .then((res) => {

          setUsers(res);
          const cleanValue = maintenanceResponsible || res[0];
          handleMaintenanceResponsibleChange(cleanValue);
        })
        .catch((error) => {
          setUsers([null]); // list not empty so it does not loop
          const cleanValue = maintenanceResponsible || null;
          handleMaintenanceResponsibleChange(cleanValue);
          // setUsers([{id: 1, name: "fede"},{id: 2, name: "fede2"} ]);
          // handleMaintenanceResponsibleChange(maintenanceResponsible || users[0]);
          // setMaintenanceResponsible({id: 1, name: "fede"});
          console.error(error);
        })
    }
    if (!manufacturers.length) {
      getAllManufacturers()
        .then((res) => {
          setManufacturers(res);
          const cleanValue = manufacturer || res[0];
          handleManufacturerChange(cleanValue);
        })
        .catch((error) => {
          setManufacturers([null]);
          // setManufacturer(null);
          // handleManufacturerChange([{id: 1, name: "fede"}]);
          handleManufacturerChange(manufacturer || null);
          console.error(error);
        })
    }

    if (!floors.length) {
      getAllFloors()
        .then((res) => {
          setFloors(res);
          const cleanValue = floor || res[0];
          handleFloorChange(cleanValue);
        })
        .catch((error) => {
          setFloors([null]);
          // setFloor(null);
          // setFloors([{id: 1, name: "fede"}]);
          handleFloorChange(floor || null);
          console.error(error);
        })
    }
    if (!areas.length) {
      getAllAreas()
        .then((res) => {
          setAreas(res);
          const cleanValue = area || res[0];
          handleAreaChange(cleanValue);
        })
        .catch((error) => {
          setAreas([null]);
          // setArea(null);
          // setAreas([{id: 1, name: "fede"}]);
          handleAreaChange(area || null);
          console.error(error);
        })
    }
    if (!sublevels.length) {
      getAllSublevels()
        .then((res) => {
          setSublevels(res);
          const cleanValue = sublevel || res[0];
          handleSublevelChange(cleanValue);
        })
        .catch((error) => {
          setSublevels([null]);
          // setSublevel(null);
          // setSublevels([{id: 1, name: "fede"}]);
          handleSublevelChange(sublevel || null);
          console.error(error);
        })
    }
    if (!makes.length) {
      // setMakes([
      //   {id: 1, name: "fede1"},
      //   {id: 2, name: "fede2"},
      //   {id: 3, name: "fede3"},
      // ]);
      // handleMakeChange(make || makes[0]);
      getAllMakes()
        .then((res) => {
          setMakes(res);
          const cleanValue = make || res[0];
          handleMakeChange(cleanValue);
        })
        .catch((error) => {
          setMakes([null]);
          handleMakeChange(make || null);
        })
    }
    if (!models.length) {
      // setModels([
      //   {id: 1, name: "fede10", modelId: 1},
      //   {id: 2, name: "fede11", modelId: 1},
      //   {id: 3, name: "fede12", modelId: 1},
      //   {id: 4, name: "fede20", modelId: 2},
      //   {id: 5, name: "fede21", modelId: 2},
      //   {id: 6, name: "fede30", modelId: 3},
      // ]);
      // handleModelChange(model || models[0]);
      // setModel(models.find(m => m.active));
      getAllModels()
        .then((res) => {
          setModels(res);
          const cleanValue = model || res[0];
          handleModelChange(cleanValue);
        })
        .catch((error) => {
          setModels([null]);
          handleModelChange(model || null);
        })
    }
    if (!machineTypes.length) {
      setMachineTypes([
        { name: "Hidráulica", id: "1" },
        { name: "Mecánica", id: "2" },
        { name: "Neumática", id: "3" },
        { name: "Eléctrica", id: "4" },
      ]);
      const cleanValue = type || machineTypes[0];
      handleTypeChange(cleanValue);
    }
    if (!manufacturerTypes.length) {
      setManufacturerTypes([
        { name: "Original", id: "1" },
        { name: "Según Plano", id: "2" },
      ]);
      const cleanValue = manufacturerType || manufacturerTypes[0];
      handleManufacturerTypeChange(cleanValue);
    }
    if (!states.length) {
      setStates([
        { name: "Producción", id: "1" },
        { name: "Mantenimiento", id: "2" },
        { name: "Detenida", id: "3" },
      ]);
      const cleanValue = state || states[0];
      handleStateChange(cleanValue);
    }
  }, [
    forceRerender,
    manufacturers,
    areas,
    floors,
    states,
    sublevels,
    users,
    manufacturerTypes,
    machineTypes,
    makes,
    models,
  ]);

  const handleInternalNameChange = (value) => {
    setInternalName(value);
    onChange("internal_name", value)
  }
  const handleserieNumberChange = (value) => {
    setSerieNumber(value);
    onChange("serie_number", value);
  }
  const handleMakeChange = (value) => {
    setMake(value);
    onChange("make", value);
  }
  const handleModelChange = (value) => {
    setModel(value);
    onChange("model", value);
  }
  const handleFloorChange = (value) => {
    setFloor(value);
    onChange("floor", value);
  }
  const handleAreaChange = (value) => {
    console.log('area = ', value);
    setArea(value);
    onChange("area", value);
  }
  const handleSublevelChange = (value) => {
    setSublevel(value);
    onChange("sublevel", value);
  }
  const handleStateChange = (value) => {
    setState(value);
    onChange("state", value);
  }
  const handleDescriptionChange = (value) => {
    setDescription(value);
    onChange("description", value);
  }
  const handleFlatNumberChange = (value) => {
    setFlatNumber(value);
    onChange("flat_number", value);
  }
  const handlePurchaseNumberChange = (value) => {
    setPurchaseNumber(value);
    onChange("purchase_number", value);
  }
  const handleManufacturerTypeChange = (value) => {
    setManufacturerType(value);
    onChange("manufacturer_type", value);
  }
  const handleManufacturerChange = (value) => {
    setManufacturer(value);
    onChange("manufacturer", value);
  }
  const handleLastMaintenanceDateChange = (value) => {
    setLastMaintenanceDate(value);
    onChange("last_maintenance_date", value);
  }
  const handleNextMaintenanceDateChange = (value) => {
    setNextMaintenanceDate(value);
    onChange("next_maintenance_date", value);
  }
  const handleTypeChange = (value) => {
    setType(value);
    onChange("type", value);
  }
  const handleWorkingFromDateChange = (value) => {
    setWorkingFromDate(value);
    onChange("working_from_date", value);
  }
  const handleRelevantDataChange = (value) => {
    setRelevantData(value);
    onChange("relevant_data", value);
  }
  const handleMaintenanceResponsibleChange = (value) => {
    setMaintenanceResponsible(value);
    onChange("maintenance_responsible", value);
  }

  const checkSelected = (optionId, option) => {
    console.log("option id ", optionId);
    option && console.log("selected value id ", option.id);
    const isSelected = option ? optionId === option.id : false;
    console.log("comparation", isSelected);
    return isSelected;
    // setPlant(selectedField(plants, value));
  };

  const App = () => {
    try {
      return (
        <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Container>
          <div>
            <h2>{selectMessage("title")}</h2>
            <hr />
          </div>
          <Form>
            <Row className="mt-5 flex space-around text-left">
              <Col lg="6" marginRight={"1000px"}>
                <Form.Group controlId="name" className="mt-4">
                  <Form.Label>*{selectMessage("name")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Máquina 1"
                    onChange={(e) => handleInternalNameChange(e.target.value)}
                    value={internalName}
                  />
                </Form.Group>
                <Form.Group controlId="make" className="mt-4">
                  <Form.Label>*{selectMessage("make")}</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={"Seleccionar marca"}
                    onChange={(e) => handleMakeChange(e.target.value)}
                  >
                    {makes.map((m, i) => (
                      <option
                        key={i}
                        value={m.id}
                        selected={make}
                      >
                        {m.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="serie_number" className="mt-4">
                  <Form.Label>*{selectMessage("serieNumber")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ingrese el número de serie"
                    onChange={(e) => handleserieNumberChange(e.target.value)}
                    value={serieNumber}
                  />
                </Form.Group>

                <Form.Group controlId="model" className="mt-4">
                  <Form.Label>*{selectMessage("model")}</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={"Seleccionar modelo"}
                    onChange={(e) => handleModelChange(e.target.value)}
                  >
                    {models.map((u, i) => (
                      <option
                        key={i}
                        value={u.id}
                        selected={model}
                      >
                        {u.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="floor" className="mt-4">
                  <Form.Label>*{selectMessage("floor")}</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={"Seleccionar planta"}
                    onChange={(e) => handleFloorChange(e.target.value)}
                  >
                    {floors.map((u, i) => (
                      <option
                        key={i}
                        value={u.id}
                        selected={checkSelected(u.id, floor)}
                      >
                        {u.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="sublevel" className="mt-4">
                  <Form.Label>*{selectMessage("sublevel")}</Form.Label>
                  <Form.Control
                    as="select"
                    value={sublevel}
                    onChange={(event) => handleSublevelChange(event.target.value)}
                  >
                    {sublevels.map((u, i) => (
                      <option key={i} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="area" className="mt-4">
                  <Form.Label>*{selectMessage("area")}</Form.Label>
                  <Form.Control
                    as="select"
                    value={area}
                    onChange={(event) => handleAreaChange(event.target.value)}
                  >
                    {areas.map((u, i) => (
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
                    value={state}
                    onChange={(e) => handleStateChange(e.target.value)}
                  >
                    {states.map((u, i) => (
                      <option key={i} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col lg="12">
                <Form.Group
                  controlId="description"
                  className="mt-4"
                  style={{ height: "100%" }}
                >
                  <Form.Label>*{selectMessage("description")}</Form.Label>
                  <TextArea
                    name="Description"
                    rows={4}
                    value={description}
                    placeholder={"Descripción"}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="planId" className="mt-4">
                  <Form.Label>{selectMessage("planId")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={flatNumber}
                    placeholder="Ingrese el número de plano de la máquina"
                    onChange={(e) => handleFlatNumberChange(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="purchaseNumber" className="mt-4">
                  <Form.Label>{selectMessage("purchaseNumber")}</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={purchaseNumber}
                    placeholder="Ingrese el número de compra de la máquina"
                    onChange={(e) => handlePurchaseNumberChange(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="maintenanceResponsible" className="mt-4">
                  <Form.Label>
                    *{selectMessage("maintenanceResponsible")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    value={maintenanceResponsible}
                    onChange={(event) =>
                      handleMaintenanceResponsibleChange(event.target.value)
                    }
                  >
                    {users.map((u, i) => (
                      <option key={i} value={u.id}>
                        {u.username}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="lastMaintenanceDate" className="mt-4">
                  <Form.Label>*{selectMessage("lastMaintenanceDate")}</Form.Label>
                  <br />
                  <DatePicker
                    date={lastMaintenanceDate}
                    onChange={(date) =>
                      handleLastMaintenanceDateChange(date)
                    }
                  />
                </Form.Group>
                <Form.Group controlId="type" className="mt-4">
                  <Form.Label>*{selectMessage("type")}</Form.Label>
                  <Form.Control
                    as="select"
                    placeholder={"Seleccionar tipo de máquina"}
                    value={type}
                    onChange={(event) => handleTypeChange(event.target.value)}
                  >
                    {machineTypes.map((u, i) => (
                      <option key={i} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="manufacturerType" className="mt-4">
                  <Form.Label>*{selectMessage("manufacturerType")}</Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    value={manufacturerType}
                    onChange={(e) =>
                      handleManufacturerTypeChange(e.target.value)
                    }
                  >
                    {manufacturerTypes.map((u, i) => (
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
                    value={manufacturer}
                    onChange={(event) => handleManufacturerChange(event.target.value)}
                  >
                    {manufacturers.map((p, i) => (
                      <option key={i} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="nextMaintenanceDate" className="mt-4">
                  <Form.Label>*{selectMessage("nextMaintenanceDate")}</Form.Label>
                  <br />
                  <DatePicker
                    date={nextMaintenanceDate}
                    onChange={(date) =>
                      handleNextMaintenanceDateChange(date)
                    }
                  />
                </Form.Group>
                <Form.Group controlId="workingFromDate" className="mt-4">
                  <Form.Label>*{selectMessage("workingFromDate")}</Form.Label>
                  <br />
                  <DatePicker
                    date={workingFromDate}
                    onChange={(date) =>
                      handleWorkingFromDateChange(date)
                    }
                  />
                </Form.Group>
              </Col>
              <Col>
                {" "}
                <Form.Group controlId="files" className="mt-4">
                  <Form.Label>*Archivos Adjuntos de la máquina</Form.Label>
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
                      whiteSpace: "wrap",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "1100px",
                        overflowX: "scroll",
                        display: "flex",
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
                    </div>

                    <ModalComponent
                      show={showModal}
                      onClose={closeModal}
                      children={displayModalContent(selectedFile)}
                    />
                  </div>
                </Row>
              </Col>
              <Col lg="12">
                <Form.Group
                  controlId="moreInfo"
                  className="mt-4"
                  style={{ height: "100%" }}
                >
                  <Form.Label>{selectMessage("moreInfo")}</Form.Label>
                  <TextArea
                    name="moreInfo"
                    rows={4}
                    value={relevantData}
                    placeholder={"Describa otros datos relevantes"}
                    onChange={(e) => handleRelevantDataChange(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Container>
      )}
    </>
      )
    }
    catch (e) {
      return <div></div>
    }
  }

  return (
    <div>{App()}</div>
  );
};

export default MachineForm;
