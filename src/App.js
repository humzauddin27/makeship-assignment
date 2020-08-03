import React, { Component } from "react";
import axios from "axios";
import Display from "./components/Display";
import "./App.css";

class App extends Component {
  state = {
    customer: null,
    error: null
  };

  setCustomer(bool) {
    this.setState({ customer: bool });
  }

  renderStartScreen() {
    return (
      <div className="startScreen">
        <p onClick={() => this.setCustomer(true)} className="customer">
          Customer
        </p>
        <p onClick={() => this.setCustomer(false)} className="seller">
          Seller
        </p>
      </div>
    );
  }

  render() {
    const { error, customer } = this.state;
    if (error) {
      return (
        <div className="failed-load">
          <p> Oops! Something went wrong... </p>
        </div>
      );
    }
    /* 
    At the beginning, we ask if you want to be a customer or a seller.
      Display will be the store (customer, can make comments only)
      
      Store will have all the functionalities of above, but extra button to upload
        That upload will create new tiles/items on the server.
    */
    return (
      <div className="App">
        <header className="App-header">
          <div>Gimage</div>
        </header>
        <div className="body">
          {customer === null ? (
            this.renderStartScreen()
          ) : (
            <Display customer={customer} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
