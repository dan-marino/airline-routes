import React, { Component } from "react";
import "./App.css";
const { routes, airlines, airports, getAirlinesById, getAirportByCode } = require("./data.js").default;

const routesDisplay = routes.map((route) => {
  return (
    <tr key={`${route.airline}${route.src}${route.dest}`}>
      <td>{getAirlinesById(route.airline).name}</td>
      <td>{getAirportByCode(route.src).name}</td>
      <td>{getAirportByCode(route.dest).name}</td>
    </tr>
  );
});

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table className="ui fixed single line celled table">
            <thead>
              <tr>
                <th colSpan="3">Routes</th>
              </tr>
            </thead>
            <tbody>{routesDisplay}</tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
