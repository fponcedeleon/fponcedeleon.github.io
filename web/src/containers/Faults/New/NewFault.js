import React, { useState, useEffect } from "react";
import { createNewFault } from "service/fault.js";
import { getAllUsers } from "service/users.js";
import { getAllComponents } from "service/component.js";
import { getAllPieces } from "service/piece.js";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Loading } from "components/Loading/index";
import { DatePicker } from "components/UI/DatePicker/index";
import useTranslate from "hooks/useTranslate";
import { TextArea } from "components/TextArea";
import { FileFrame } from "components/FileFrame/FileFrame.tsx";
import { ModalComponent } from "components/Modal/Modal";
import { MultiSelect } from "components/MultiSelect";
import InnerImageZoom from "react-inner-image-zoom";
import PDFViewer from "pdf-viewer-reactjs";
import { VoiceReproducer } from "components/VoiceReproducer";
import { TrashButton } from "components/UI/Trash";

const NewFault = () => {
  const t = useTranslate();
  const [isLoading, setIsLoading] = useState(false);
  const [fault, setFault] = useState([]);
  const [date, setDate] = useState(new Date());

  const [eventTypes, setEventTypes] = useState([
    { name: "Falla", id: "1" },
    { name: "Mantenimiento Preventivo", id: "2" },
  ]);

  const selectedMachine = (componentId) => {
    console.log(componentId);
    const lowercasedValue = componentId && componentId.toLowerCase().trim();
    const machineData = machines.filter((item) => {
      return Object.keys(item).some((key) => {
        console.log(item[key]);
        return ["id"].includes(key)
          ? item[key].toString().toLowerCase().includes(lowercasedValue)
          : false;
      });
    });
    console.log("machine data", machineData);
    // console.log("nombre de machine data", machineData[0].name);
    return machineData[0] && machineData[0].name;
  };

  const [eventType, setEventType] = useState(eventTypes[0]);
  const [resolutionDate, setResolutionDate] = useState(null);
  const [forceRerender, setForceRerender] = useState(false);
  const [users, setUsers] = useState([]);
  //   { name: "Martin", id: "1" },
  //   { name: "Federico", id: "2" },
  //   { name: "Pedro", id: "3" },
  //   { name: "Pablo", id: "4" },
  //   { name: "Santiago", id: "5" },
  // ]);
  const [reportingUsers, setReportingUsers] = useState([]);
  const [machines, setMachines] = useState([
    { name: "Máquina de templado", id: "1" },
    { name: "Máquina de recocido", id: "2" },
    { name: "Máquina de normalizado", id: "3" },
  ]);
  const [stages, setStages] = useState([
    { name: "Etapa de Enfriamiento", id: "1" },
    { name: "Etapa de Endurecimiento", id: "2" },
    { name: "Etapa de Cortado", id: "3" },
    { name: "Etapa de Doblado", id: "4" },
  ]);
  const [types, setTypes] = useState([
    { name: "Eléctrica", id: "1" },
    { name: "Mecáncia", id: "2" },
    { name: "Hidraúlica", id: "3" },
    { name: "Neumática", id: "4" },
  ]);
  const [priorities, setPriorities] = useState([
    { name: "Baja", id: "1" },
    { name: "Media", id: "2" },
    { name: "Alta", id: "3" },
  ]);
  const [components, setComponents] = useState([]);
  //   { name: "Tambor", id: "1", machineId: "1" },
  //   { name: "Bobinadora", id: "2", machineId: "1" },
  //   { name: "Decapador", id: "3", machineId: "2" },
  //   { name: "Jabonera", id: "4", machineId: "3" },
  // ]);
  const [pieces, setPieces] = useState([]);
  //   { name: "Transforador 1", id: "1" },
  //   { name: "Transformador 2", id: "2" },
  //   { name: "Palanca", id: "3" },
  //   { name: "Resorte", id: "4" },
  // ]);
  const [state, setState] = useState("Sin resolver");
  const [stage, setStage] = useState(stages[0].name);

  const [user, setUser] = useState(null);
  const [piece, setPiece] = useState(pieces[0] && pieces[0].id);
  const [type, setType] = useState(types[0] && types[0].name);
  const [component, setComponent] = useState(components[0] && components[0].id);
  const [machine, setMachine] = useState(selectedMachine(component));
  const [priority, setPriority] = useState(priorities[0] && priorities[0].name);

  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [randomKey, setRandomKey] = useState("");

  const [descriptionRecord, setDescriptionRecord] = useState(null);
  const [analyzedMeasuresRecord, setAnalyzedMeasuresRecord] = useState(null);
  const [consequencesRecord, setConsequencesRecord] = useState(null);

  useEffect(() => {
    // set initial key
    if (!randomKey) {
      setRandomKey(Math.random().toString(36));
    }
    setIsLoading(true);
    if (!users.length) {
      getAllUsers()
        .then((res) => {
          setUsers(res);
          setUser(res[0].id);
        })
        .catch((error) => {
          setUsers([]);
          setUser(null);
          console.error(error);
        });
    }
    if (!components.length) {
      getAllComponents()
        .then((res) => {
          setComponents(res);
        })
        .catch((error) => {
          setComponents([]);
          console.error(error);
        });
    }
    if (!pieces.length) {
      getAllPieces()
        .then((res) => {
          setPieces(res);
        })
        .catch((error) => {
          setPieces([]);
          console.error(error);
        });
    }

    setIsLoading(false);
  }, [randomKey]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const data = {
        ...fault,
        start_date_time: date,
        end_date_time: resolutionDate,
        clasification: type,
        type: eventType && eventType.name,
        priority,
        state,
        machine: machine && machine.id,
        component,
        piece,
        stage,
        responsible: user,
        files,
        reporting_users: reportingUsers,
      };
      console.log("DATOS DE FALLA", data);
      await createNewFault(data);
      setIsLoading(false);
      alert(t("containers.faults.newFault.createdSuccessfully"));
    } catch (e) {
      alert(t("containers.faults.newFault.errorOnCreation"));
      setIsLoading(false);
    }
  };

  const onChange = (prop, value) => {
    fault[prop] = value;
  };

  const handleRecordChange = (attr, record) => {
    if (
      !record &&
      !window.confirm(t("containers.faults.newFault.deleteVoiceRecord"))
    ) {
      return;
    }
    switch (attr) {
      case "description_record":
        setDescriptionRecord(record);
        onChange("description_record", record);
        break;
      case "analyzed_measures_record":
        setAnalyzedMeasuresRecord(record);
        onChange("analyzed_measures_record", record);
        break;
      case "consequences_record":
        setConsequencesRecord(record);
        onChange("consequences_record", record);
        break;
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-md-center mt-5 text-left">
              <Col lg="12">
                <h2>{t("containers.faults.newFault.title")}</h2>
                <hr />
                <Form.Group controlId="name" className="mt-4">
                  <Form.Label>
                    *{t("containers.faults.newFault.name")}
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Ingresar título de falla"
                    onChange={(e) => onChange("name", e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="state" className="mt-4">
                  <Form.Label>
                    {t("containers.faults.newFault.state")}
                  </Form.Label>
                  <Form.Control
                    readOnly
                    type="text"
                    placeholder="Estado"
                    value={state}
                  />
                </Form.Group>
                <Form.Group controlId="clasification" className="mt-4">
                  <Form.Label> Tipo</Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    readOnly
                    value={eventType && eventType.name}
                    placeholder={"Tipo de Evento"}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="FaultDate" className="mt-4">
                  <Form.Label>
                    *{t("containers.faults.newFault.date")}
                  </Form.Label>
                  <br />
                  <DatePicker date={date} onChange={(date) => setDate(date)} />
                </Form.Group>
                <Form.Group controlId="resolutiontDate" className="mt-4">
                  <Form.Label>
                    *{t("containers.faults.newFault.resolutionDate")}
                  </Form.Label>
                  <br />
                  <DatePicker
                    date={resolutionDate}
                    placeholder="Seleccione Fecha de Resolución, en caso de existir"
                    onChange={(date) => setResolutionDate(date)}
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mt-4">
                  <Form.Label>*Descripción</Form.Label>
                  <br />
                  <TextArea
                    includeMicro
                    onRecord={(record) =>
                      handleRecordChange("description_record", record)
                    }
                    name="Description"
                    rows={4}
                    placeholder={"Descripción"}
                    onChange={(e) => onChange("description", e.target.value)}
                  />
                  {descriptionRecord && (
                    <>
                      <div style={{ display: "inline-block", width: "100%" }}>
                        <VoiceReproducer src={descriptionRecord.blobURL} />
                        <TrashButton
                          onClick={() =>
                            handleRecordChange("description_record", null)
                          }
                          style={{ marginTop: "-50px", marginLeft: "5px" }}
                          size="1x"
                        />
                      </div>
                    </>
                  )}
                </Form.Group>

                <Form.Group controlId="machine" className="mt-4">
                  <Form.Label>
                    {" "}
                    *{t("containers.faults.newFault.machine")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    readOnly
                    type="text"
                    placeholder="Máquina Asociada"
                    value={(machine && machine.name) || ""}
                  />
                </Form.Group>

                <Form.Group controlId="component" className="mt-4">
                  <Form.Label>
                    {" "}
                    *{t("containers.faults.newFault.component")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={(event) => {
                      setComponent(event.target.value);
                      setMachine(selectedMachine(event.target.value));
                    }}
                  >
                    {components.map((p, i) => (
                      <option key={i} value={p.id}>
                        {p.internal_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="piece" className="mt-4">
                  <Form.Label>
                    {" "}
                    *{t("containers.faults.newFault.piece")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={(event) => setPiece(event.target.value)}
                  >
                    {pieces.map((p, i) => (
                      <option key={i} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="users" className="mt-4">
                  <Form.Label>*Usuarios Relatores</Form.Label>
                  <br />
                  <MultiSelect
                    options={users.map((user) => ({
                      value: user.id,
                      label: user.username,
                    }))}
                    placeholder={"Seleccione los usuarios relatores"}
                    onChange={(users) =>
                      setReportingUsers(
                        users &&
                          users.map((user) => ({
                            id: user.value,
                          }))
                      )
                    }
                  />
                </Form.Group>
                <Form.Group controlId="users" className="mt-4">
                  <Form.Label>*Usuario Responsable</Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={(event) => setUser(event.target.value)}
                  >
                    {users.map((p, i) => (
                      <option key={i} value={p.id}>
                        {p.username}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="users" className="mt-4">
                  <Form.Label>
                    {t("containers.faults.newFault.fault_number")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    required
                    type="number"
                    placeholder="Ingresar número de falla"
                    onChange={(e) => onChange("fault_number", e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="type" className="mt-4">
                  <Form.Label>
                    {" "}
                    *{t("containers.faults.newFault.type")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={(event) => setType(event.target.value)}
                  >
                    {types.map((p, i) => (
                      <option key={i} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="priority" className="mt-4">
                  <Form.Label>
                    {" "}
                    *{t("containers.faults.newFault.priority")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={(event) => setPriority(event.target.value)}
                  >
                    {priorities.map((p, i) => (
                      <option key={i} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="stage" className="mt-4">
                  <Form.Label>
                    {" "}
                    {t("containers.faults.newFault.stage")}
                  </Form.Label>
                  <br />
                  <Form.Control
                    as="select"
                    onChange={(event) => setStage(event.target.value)}
                  >
                    {stages.map((p, i) => (
                      <option key={i} value={p.name}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="analyzed_measures" className="mt-4">
                  <Form.Label>
                    {" "}
                    {t("containers.faults.newFault.analyzed_measures")}
                  </Form.Label>
                  <br />
                  <TextArea
                    includeMicro
                    onRecord={(record) =>
                      handleRecordChange("analyzed_measures_record", record)
                    }
                    name="analyzed_measures"
                    rows={4}
                    placeholder={
                      "Describa las mediciones analizadas de la falla"
                    }
                    onChange={(e) =>
                      onChange("analyzed_measures", e.target.value)
                    }
                  />
                  {analyzedMeasuresRecord && (
                    <>
                      <div style={{ display: "inline-block", width: "100%" }}>
                        <VoiceReproducer src={analyzedMeasuresRecord.blobURL} />
                        <TrashButton
                          onClick={() =>
                            handleRecordChange("analyzed_mesures_record", null)
                          }
                          style={{ marginTop: "-50px", marginLeft: "5px" }}
                          size="1x"
                        />
                      </div>
                    </>
                  )}
                  <Form.Group controlId="consecuences" className="mt-4">
                    <Form.Label>Consecuencias</Form.Label>
                    <br />
                    <TextArea
                      includeMicro
                      onRecord={(record) =>
                        handleRecordChange("consequences_record", record)
                      }
                      name="Consecuences"
                      rows={4}
                      placeholder={"Consecuencias"}
                      onChange={(e) => onChange("consequences", e.target.value)}
                    />
                    {consequencesRecord && (
                      <>
                        <div style={{ display: "inline-block", width: "100%" }}>
                          <VoiceReproducer src={consequencesRecord.blobURL} />
                          <TrashButton
                            onClick={() =>
                              handleRecordChange("consequences_record", null)
                            }
                            style={{ marginTop: "-50px", marginLeft: "5px" }}
                            size="1x"
                          />
                        </div>
                      </>
                    )}
                  </Form.Group>
                </Form.Group>
                <Form.Group controlId="relevant_data" className="mt-4">
                  <Form.Label>
                    {" "}
                    *{t("containers.faults.newFault.moreInfo")}
                  </Form.Label>
                  <br />
                  <TextArea
                    name="relevant_data"
                    rows={4}
                    placeholder={"Describa otras datos de la falla"}
                    onChange={(e) => onChange("relevant_data", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Col>
              {" "}
              <Form.Group controlId="files" className="mt-4">
                <Form.Label>*Archivos Adjuntos de la falla</Form.Label>
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
            <Row className="justify-content-end mt-5 mb-5">
              <Button variant="primary" type="submit" className="center">
                Reportar
              </Button>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default NewFault;
