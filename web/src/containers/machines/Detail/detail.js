import React, { useState } from "react";
import "./detail.css";

const DetailPage = (props) => {
  const machineId = props.match.params.id;
  console.log("PROPS", props);
  const [show, setShow] = useState(false);
  const [machine, setMachine] = useState({});

  return (
    <div className="machineContainer">
      <div className="machineInfoGroup">
        <span className="machineTitle">Detalles</span>
        <div className="machineBasicData">
          <div className="basicDataItem">
            <span> Numero de serie:</span>
            <div>{machine["serie_number"]} asdads</div>
          </div>

          <div className="basicDataItem">
            <span> Marca:</span>
            <div>{machine["make"]} asdads</div>
          </div>
          <div className="basicDataItem">
            <span>Modelo:</span>
            <div>{machine["model"]} asdads</div>
          </div>
          <div className="basicDataItem">
            <span>Fabricante:</span>
            <div>{machine["manufacturer"]} asdads</div>
          </div>
          <div className="basicDataItem">
            <span>Responsable:</span>
            <div>{machine["maintenance_responsible"]} asdads</div>
          </div>
        </div>
      </div>
      <div className="machineInfoGroup">
        <span className="machineTitle">Ubicacion</span>
        <div className="machineLocation">
          <div className="locationItem">
            <span> Planta</span>
            <div>{machine["floor"]} asdads</div>
          </div>
          <div className="locationItem">
            <span>Area</span>
            <div>{machine["area"]} asdads</div>
          </div>
          <div className="locationItem">
            <span>Subnivel</span>
            <div>{machine["sublevel"]} asdads</div>
          </div>
        </div>
      </div>
      <div className="machineInfoGroup">
        <span className="machineTitle">Descripcion</span>
        <div className="machineDescription">
          {" "}
          {machine["description"]}
          adadsadad adas adsa dasd asd ad aadasd asd a asdasd asd a dasdasd
          asdasdasd{" "}
        </div>
      </div>
      <div className="machineInfoGroup">
        <span className="machineTitle">Datos Relevantes</span>
        <div className="machineDescription">
          {" "}
          {machine["relevant_data"]}
          adadsadad adas adsa dasd asd ad aadasd asd a asdasd asd a dasdasd
          asdasdasd{" "}
        </div>
      </div>
      {/* <div className="machineState"> State</div> */}

      {/* <span className="machineTitle">Documentos</span>
      <span className="machineTitle">Lista de componentes</span> */}
      <div className="machineInfoGroup">
        <span className="machineTitle"> Fechas Importantes</span>
        <div className="machineLocation">
          <div>{machine["last_maintenance_date"]} adsasd</div>
          <div>{machine["next_maintenance_date"]} asdasd</div>
          <div>{machine["working_from_date"]} sdad</div>
        </div>
      </div>
      <div className="machineInfoGroup">
        {" "}
        <span className="machineTitle"> Cantidad de Fallas</span>
        <div className="machineLocation">
          <div>cantidad</div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
