import React from "react";

const Table = ({ headers, format, columns }) => {
  return (
    <table className="ui striped table">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{columns}</tbody>
    </table>
  );
};

export default Table;
