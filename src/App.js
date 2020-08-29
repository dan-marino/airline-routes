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

  filterRoutes = (airline, airport) => {
    if (![airline, airport].some((selection) => selection)) return routes;
    return routes.filter(
      (route) => { return (
        (!airline || route.airline === +airline) &&
        (!airport || [route.src, route.dest].includes(airport))
      )}
    );
  };

  selectedAirlineChanged = (airline) => {
    const filteredByRoutes = this.filterRoutes(
      airline.id,
      this.state.airportSelected
    );
    this.setState({
      airlineSelected: airline.id,
      filteredRoutes: filteredByRoutes,
      currentPage: STARTING_CURRENT_PAGE,
      previousPage: STARTING_PREVIOUS_PAGE,
      totalPages: Math.ceil(filteredByRoutes.length / ROUTES_PER_PAGE),
      routesDisplayed: filteredByRoutes.slice(
        STARTING_PREVIOUS_PAGE,
        ROUTES_PER_PAGE
      ),
    });
  };

  selectedAirportChanged = (airport) => {
    const filteredByRoutes = this.filterRoutes(
      this.state.airlineSelected,
      airport.id
    );
    this.setState({
      airportSelected: airport.id,
      filteredRoutes: filteredByRoutes,
      currentPage: STARTING_CURRENT_PAGE,
      previousPage: STARTING_PREVIOUS_PAGE,
      totalPages: Math.ceil(filteredByRoutes.length / ROUTES_PER_PAGE),
      routesDisplayed: filteredByRoutes.slice(
        STARTING_PREVIOUS_PAGE,
        ROUTES_PER_PAGE
      ),
    });
  };

  filteredAirlines = (id) => {
    routes.filter((route) => route.airline === +id);
  };

  filteredAirports = (id) => {
    return routes.filter((route) => {
      return route.src === id || route.dest === id;
    });
  };

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

  resetFilters = () => {
    const selects = [...document.getElementsByTagName("select")]
    selects.forEach(select => {})

    this.setState({
      airportSelected: "",
      airlineSelected: "",
      filteredRoutes: routes,
      currentPage: STARTING_CURRENT_PAGE,
      previousPage: STARTING_PREVIOUS_PAGE,
      totalPages: Math.ceil(routes.length / ROUTES_PER_PAGE),
      routesDisplayed: routes.slice(
        STARTING_PREVIOUS_PAGE,
        ROUTES_PER_PAGE
      ),
    });
  }

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
    // console.log(this.state.filteredRoutes);
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <br />
        <section className="d-flex justify-content-center">
          <FilterMenu
            choices={airlines}
            currentSelections={[
              this.state.airportSelected,
              this.state.airlineSelected,
            ]}
            filteredRoutes={this.state.filteredRoutes}
            onSelected={this.selectedAirlineChanged}
            leadingChoice="All Airplanes"
            labelFor="Show routes on"
          ></FilterMenu>
          <FilterMenu
            choices={airports}
            currentSelections={[
              this.state.airportSelected,
              this.state.airlineSelected,
            ]}
            filteredRoutes={this.state.filteredRoutes}
            onSelected={this.selectedAirportChanged}
            leadingChoice="All Airports"
            labelFor="flying in or out of"
          ></FilterMenu>
          <button type="button" onClick={this.resetFilters} className="btn btn-primary btn-sm">
            Show All Results
          </button>
        </section>
        <br />
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
