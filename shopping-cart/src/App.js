import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductListing from "./ProductListing";

function App() {
  return (
    <React.Fragment>
      <ProductListing />
    </React.Fragment>
  );
}

export default App;
