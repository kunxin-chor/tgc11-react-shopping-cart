import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from "./UserProfile";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import config from "./config";
import CartContext from "./CartContext";

function App() {
  useEffect(() => {
    setInterval(async () => {
      const response = await axios.post(
        config.BASE_URL + "/api/users/refresh",
        {
          refreshToken: localStorage.getItem("refreshToken")
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
    }, config.REFRESH_TOKEN_INTERVAL);
  });

  const [cart, setCart] = useState([]);
  const [cartIsDirty, setCartIsDirty] = useState(false);

  useEffect(()=>{
    setCartIsDirty(true);
  },[cart])

  useEffect( ()=> {
      // save a JSON copy of the shopping cart to my localstorage
      // because localStorage can only save strings
      // so must convert the cart object to a JSON string
      // then can save
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartIsDirty(false);
  }, [cart])

  useEffect( ()=>{
    // retrieve the saved shopping cart from local storage, if any
    // OR retrieve from the database (your choice)
    if (cartIsDirty == false) {
        let cartData = localStorage.getItem('cart');
        if (cartData) {
            setCart(JSON.parse(cartData));
        }
    } else {
        // load the shopping cart from database
    }

  }, [])

  const context = {
      getCart: () => {
          return cart
      },
      addProductToCart: (product) => {
          // clone the original array
          const cloned = [...cart];
          // make the change
          cloned.push(product);

          // persist the change in state
          setCart(cloned)
      }
  }

  return (
    <React.Fragment>
      <div className="container-fluid">
        <Router>
          <nav className="navbar navbar-expand-sm bg-light navbar-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <CartContext.Provider value={context}>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
            <Route exact path="/products">
              <ProductPage />
            </Route>
            </CartContext.Provider>
          </Switch>
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
