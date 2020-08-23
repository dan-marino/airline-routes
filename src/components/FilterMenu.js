import React from "react";

const FilterMenu = ({
  choices,
  currentSelections,
  onSelected,
  leadingChoice,
  labelFor,
  filteredRoutes,
}) => {
  const { airline, src, dest } = filteredRoutes;

  const adjustFilter = function (e) {
    const selected = e.target.selectedOptions[0];
    onSelected({ id: selected.id, name: selected.getAttribute("name") });
  };

  const disableSelection = (key, choice) => {
    const statement = !(
      !currentSelections.some((selection) => selection) ||
      filteredRoutes.find((routes) => Object.values(routes).includes(key))
    );
    // console.log(statement);
    return statement;
  };
  const selections = choices.map((choice) => {
    const key = choice.id || choice.code;
    return (
      <option
        key={key}
        id={key}
        disabled={disableSelection(key, choice)}
        name={choice.name}
      >
        {choice.name}
      </option>
    );
  });

  return (
    <div>
      <label>{labelFor}: </label>
      <select onChange={adjustFilter}>
        <option>{leadingChoice}</option>
        {selections}
      </select>
    </div>
  );
};

export default FilterMenu;
