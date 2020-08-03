import React, { Component } from "react";
import "./index.css";

class LoadingSpinner extends Component {
  render() {
    const pokeballImage = require(`../../assets/images/Pokeball.png`);
    return (
      <img
        className="spinning-pokeball"
        src={String(pokeballImage)}
        alt="Loading..."
      />
    );
  }
}

export default LoadingSpinner;
