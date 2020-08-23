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

  const firstPage = currentPage === 1;
  const lastPage = currentPage === totalPages;
  const startingEntry = (currentPage - 1) * routesPerPage + 1;
  const endingEntry = (lastPage) ? totalRoutes : currentPage * routesPerPage;


  return (
    <div>
      <h5 className="text-center">
        Showing {startingEntry} - {endingEntry} of {totalRoutes} routes.
      </h5>
      <nav className="d-flex justify-content-center" aria-label="...">
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
    </div>
  );
};

export default Pagination;
