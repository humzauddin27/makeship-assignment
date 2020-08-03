import React, { Component } from "react";
import axios from "axios";
import Store from "../Store";
import LoadingSpinner from "../LoadingSpinner";
import "./index.css";

class Display extends Component {
  state = {};

  render() {
    const { customer } = this.props;
    /*const { pokeInfo } = this.state;
    instead of pokeinfo, this will be store loading from our backend
    our backend will either have tiles (images) or nothing at all
    if (!pokeInfo) {
      return <LoadingSpinner />;
    }*/

    return (
      <div>
        <h1> Welcome to the store! </h1>
        <Store />
        {!customer ? <button> Upload an item </button> : null}
      </div>
    );
    /* This will be the store (each item is a tile)
    if there are no items, they can upload a new item
    each item becomes a tile
    if click on tile, comments should be showns

    We can display the store and then 
    if we are a seller, i can also upload a new tile

    */
  }
}

export default Display;
