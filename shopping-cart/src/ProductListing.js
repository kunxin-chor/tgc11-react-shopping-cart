import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";

const BASE_URL = config.BASE_URL;

export default function ProductListing() {
  const [products, setProducts] = useState([]);

  // after the component is first rendered
  // load in all the products
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(BASE_URL + "/api/products");
      setProducts(response.data);
    };

    fetch();
  });

  return (
    <React.Fragment>
      <h1>Our Products</h1>
      {products.map(p => (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <h6>Cost: {p.cost}</h6>
            <p>{p.description}</p>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}
