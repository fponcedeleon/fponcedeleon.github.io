import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./containers/home/home";
import Machine from "./containers/machines/New/index.js";
import List from "./containers/machines/List/list";
import Welcome from "containers/onboarding/welcome";
import Detail from "containers/machines/Detail/detail";
import AppProviders from "./context";
import NewFault from "containers/Faults/New/NewFault";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import "react-datepicker/dist/react-datepicker.css";

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Navbar />
        <div>
          <Route path="/" exact component={Welcome} />
          <Route path="/home" exact component={Home} />
          <Route path="/machine/new" exact component={Machine} />
          <Route path="/list" exact component={List} />
          <Route path="/machine/detail/:id" exact component={Detail} />
          <Route path="/fault/new" exact component={NewFault} />
        </div>
      </BrowserRouter>
    </AppProviders>
  );
}
