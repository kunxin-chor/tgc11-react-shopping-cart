import React, {useContext} from "react";
import ProductListing from "../ProductListing";
import CartContext from "../CartContext";

export default function ProductPage() {
  let context =useContext(CartContext);
  return (
    <React.Fragment>
      <h1>Products</h1>
      <ProductListing />
    </React.Fragment>
  );
}
