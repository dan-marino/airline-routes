import React, { Component } from "react";
import "./App.css";
const { routes, airlines, airports } = require("./data.js").default;

const routesDisplay = routes.map((route) => {
  return (
    <tr key={`${route.airline}${route.src}${route.dest}`}>
      <td>{route.airline}</td>
      <td>{route.src}</td>
      <td>{route.dest}</td>
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
