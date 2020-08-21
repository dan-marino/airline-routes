import React from "react";

const Table = ({ headers, format, columns }) => {
  return (
    <table className="table-striped text-left container">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{columns}</tbody>
    </table>
  );
};

export default Table;
