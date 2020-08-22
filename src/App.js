import React from "react";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import FilterMenu from "./components/FilterMenu";
import "./App.css";

const ROUTES_PER_PAGE = 25;
const STARTING_PREVIOUS_PAGE = 0;
const STARTING_CURRENT_PAGE = 1;
const {
  routes,
  airlines,
  airports,
  getAirlinesById,
  getAirportByCode,
} = require("./data.js").default;

class App extends React.Component {
  state = {
    filteredRoutes: routes,
    routesDisplayed: routes.slice(STARTING_PREVIOUS_PAGE, ROUTES_PER_PAGE),
    previousPage: STARTING_PREVIOUS_PAGE,
    currentPage: STARTING_CURRENT_PAGE,
    totalPages: Math.ceil(routes.length / ROUTES_PER_PAGE),
    airlineSelected: "",
    airportSelected: "",
  };

  selectedAirlineChanged = (airline) => {
    const filteredByAirlines = this.filteredAirlines(airline.id);
    this.setState({
      airlineSelected: airline.id,
      filteredRoutes: filteredByAirlines,
      currentPage: STARTING_CURRENT_PAGE,
      previousPage: STARTING_PREVIOUS_PAGE,
      totalPages: Math.ceil(filteredByAirlines.length / ROUTES_PER_PAGE),
      routesDisplayed: filteredByAirlines.slice(
        STARTING_PREVIOUS_PAGE,
        ROUTES_PER_PAGE
      ),
    });
  };

  filteredAirlines = (id) => {
    return !id ? routes : routes.filter((route) => route.airline === +id);
  };

  filteredAirports = (selected) => {
    if (!selected) return routes;
    return routes.filter((route) => {
      return route.src === selected.code || route.dest === selected.code;
    });
  };

  // updatePage = (routes, currentPage) => {
  //   const startingRoute = this.state.previousPage * ROUTES_PER_PAGE;
  //   const endingRoute = this.state.currentPage * ROUTES_PER_PAGE;
  //   return routes.slice(startingRoute, endingRoute);
  // };

  pageChanged = (nextPage) => {
    const currentPage = this.state.currentPage;
    if (nextPage) {
      this.setState({
        currentPage: currentPage + 1,
        previousPage: currentPage,
        routesDisplayed: this.state.filteredRoutes.slice(
          currentPage * ROUTES_PER_PAGE,
          (currentPage + 1) * ROUTES_PER_PAGE
        ),
      });
    } else {
      this.setState({
        currentPage: currentPage - 1,
        previousPage: currentPage - 1,
        routesDisplayed: this.state.filteredRoutes.slice(
          (currentPage - 2) * ROUTES_PER_PAGE,
          (currentPage - 1) * ROUTES_PER_PAGE
        ),
      });
    }
  };

  formatValue = () => {};

  formatColumns = (routes) => {
    return routes.map((route) => {
      return (
        <tr key={`${route.airline}${route.src}${route.dest}`}>
          <td property="airlines">{getAirlinesById(route.airline).name}</td>
          <td property="src">{getAirportByCode(route.src).name}</td>
          <td property="dest">{getAirportByCode(route.dest).name}</td>
        </tr>
      );
    });
  };

  headers = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];

  formattedHeaders = this.headers.map((header) => (
    <th key={header.property}>{header.name}</th>
  ));

  render = () => {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <FilterMenu
            choices={airlines}
            currentSelection={this.state.airlineSelected}
            onSelected={this.selectedAirlineChanged}
            leadingChoice={"All Airplanes"}
          ></FilterMenu>
        </section>
        <section>
          <Table
            className="routes-table"
            headers={this.formattedHeaders}
            rows=""
            format={this.formatValue}
            columns={this.formatColumns(this.state.routesDisplayed)}
          />
        </section>
        <br />
        <footer>
          {
            <Pagination
              onPageChange={this.pageChanged}
              currentPage={this.state.currentPage}
              totalPages={this.state.totalPages}
              totalRoutes={this.state.filteredRoutes.length}
              routesPerPage={ROUTES_PER_PAGE}
            ></Pagination>
          }
        </footer>
      </div>
    );
  };
}

export default App;
