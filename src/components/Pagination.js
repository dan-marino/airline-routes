import React from "react";

const Pagination = ({
  onPageChange,
  currentPage,
  totalPages,
  totalRoutes,
  routesPerPage,
}) => {
  const onBackClick = (e) => {
    e.preventDefault();
    onPageChange(false);
  };

  const onNextClick = (e) => {
    e.preventDefault();
    onPageChange(true);
  };

  const startingEntry = (currentPage - 1) * routesPerPage + 1;
  const endingEntry = (lastPage) ? totalRoutes : currentPage * routesPerPage;
  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;

  return (
    <nav className="d-flex justify-content-center" aria-label="...">
      <h5>
        Showing {startingEntry} - {endingEntry} of {totalRoutes} routes.
      </h5>
      <ul className="pagination">
        <li className={`page-item ${firstPage ? "disabled" : ""}`}>
          <a
            className="page-link"
            onClick={onBackClick}
            tabIndex="-1"
            aria-disabled={firstPage}
          >
            Previous
          </a>
        </li>
        <li className={`page-item ${lastPage ? "disabled" : ""}`}>
          <a className="page-link" onClick={onNextClick} href="">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
