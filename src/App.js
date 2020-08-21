import React, { Component } from "react";
import Table from "./components/Table";
import "./App.css";
const {
  routes,
  airlines,
  airports,
  getAirlinesById,
  getAirportByCode,
} = require("./data.js").default;

const routesDisplay = routes.map((route) => {
  return (
    <tr key={`${route.airline}${route.src}${route.dest}`}>
      <td property="airlines">{getAirlinesById(route.airline).name}</td>
      <td property="src">{getAirportByCode(route.src).name}</td>
      <td property="dest">{getAirportByCode(route.dest).name}</td>
    </tr>
  );
});

const headers = [
  { name: "Airline", property: "airline" },
  { name: "Source Airport", property: "src" },
  { name: "Destination Airport", property: "dest" },
];

const formattedHeaders = headers.map((header) => (
  <th key={header.property}>{header.name}</th>
));

const formatValue = () => {};

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table
            className="routes-table"
            headers={formattedHeaders}
            rows=""
            format={formatValue}
            columns={routesDisplay}
          />
        </section>
      </div>
    );
  }
}

export default App;
