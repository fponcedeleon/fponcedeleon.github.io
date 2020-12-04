import React from "react";
import { GiHexagonalNut } from "react-icons/gi";
import { ImList } from "react-icons/im";
import useTranslate from "hooks/useTranslate";
import { BiError } from "react-icons/bi";

import { RiOilFill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import "./home.css";

const Home = () => {
  const t = useTranslate();
  const history = useHistory();

  function handleClickNewMachine() {
    history.push("/machine/new");
  }
  function handleClickListMachine() {
    history.push("/list");
  }

  function handleClickNewFault() {
    history.push("/fault/new");
  }

  return (
    <div className="homePanel">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="homeButton" onClick={() => handleClickNewMachine()}>
          <GiHexagonalNut size={50} />
          <p style={{ color: "#01516a", fontSize: "20px" }}>
            {t("containers.home.addNewMachine")}
          </p>
        </div>
        <div className="homeButton" onClick={() => handleClickListMachine()}>
          <ImList size={50} />
          <p style={{ color: "#01516a", fontSize: "20px" }}>
            {t("containers.home.listAllMachines")}
          </p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="homeButton disabled">
          <RiOilFill size={60} />
          <p style={{ color: "#01516a", fontSize: "20px" }}>
            {t("containers.home.addEvent")}
          </p>
        </div>
        <div className="homeButton" onClick={() => handleClickNewFault()}>
          <BiError size={65} />
          <p style={{ color: "#01516a", fontSize: "20px" }}>
            {t("containers.home.reportFault")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
