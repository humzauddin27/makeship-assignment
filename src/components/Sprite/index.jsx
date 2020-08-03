import React, { Component } from "react";
import "./index.css";
import Spiked from "../../assets/spiked";

class Sprite extends Component {
  renderImage() {
    const { path, hidden = false } = this.props;
    return hidden ? (
      <img src={path} className="pokemon-sprite-hidden" alt="random_pokemon" />
    ) : (
      <img src={path} alt="random_pokemon" />
    );
  }

  render() {
    return (
      <div className="relative">
        <div className="outer-spike">
          <Spiked fill={"#41AABA"} size={"320"} />
        </div>
        <div className="inner-spike">
          <Spiked fill={"#CFEBE7"} size={"250"} />
          {this.renderImage()}
        </div>
      </div>
    );
  }
}

export default Sprite;
