import React, { Component } from "react";

class List extends Component {
  renderList() {
    const { listOfPokemon } = this.props;
    if (!listOfPokemon) {
      return null;
    }

    return listOfPokemon.map(pokemon => (
      <div key={pokemon.name}>
        <p> {pokemon.name} </p>
      </div>
    ));
  }

  render() {
    return <div> {this.renderList()} </div>;
  }
}

export default List;
