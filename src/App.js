import React, { Component } from "react";
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
        <h3> I am logging in as a ... </h3>
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
    console.log(process.env.NODE_ENV);
    return (
      <div className="App">
        <header className="App-header">
          <div>Gimage</div>
          {customer !== null ? (
            <div className="userDetails">
              <p> {customer ? "Customer" : "Seller"} </p>
              <p className="changeUser" onClick={() => this.setCustomer(null)}>
                Change user
              </p>
            </div>
          ) : null}
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
