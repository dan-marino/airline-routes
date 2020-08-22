import React from "react";

const FilterMenu = ({ choices, currentSelection, onSelected, leadingChoice }) => {
  const adjustFilter = function(e) {
    const selected = e.target.selectedOptions[0]
    onSelected({ id: selected.id, name: selected.getAttribute('name') })
  }
  const selections = choices.map((choice) => {
    return (
      <option
        key={choice.id}
        id={choice.id}
        disabled={!(!+currentSelection || +currentSelection === choice.id)}
        name={choice.name}
      >
        {choice.name}
      </option>
    );
  });

  return (
    <select onChange={adjustFilter} className="form-control form-control-lg container">
      <option>{leadingChoice}</option>
      {selections}
    </select>
  );
};

export default FilterMenu;
