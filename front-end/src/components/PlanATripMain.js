import React, {useState, useEffect} from "react";
import NavBar from "../NavBar";

import '../css/PlanATripMain.css'

const PlanATripMain = (token, setToken) => {

  return (
    <div id="plan-a-trip-full-container">
      <NavBar
        token={token}
        setToken={setToken} />
      <div id="plan-a-trip-page-container">
        <h1>Plan a trip</h1>
      </div>
    </div>
  )
}

export default PlanATripMain;