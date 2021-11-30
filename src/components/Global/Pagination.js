import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "./Link";

// ====

function ListItem(props) {
  const { number, currentPage, icon, lastPage, archive, index } = props;
  return (
    <li
      className={`page-item ${number === currentPage && "active"} ${
        number === "ellipsis-h" && "disabled"
      } ${number === 0 && "disabled"} ${
        number === lastPage + 1 && "disabled"
      } `}
      key={`pagination-number-${number}`}
    >
      {isNaN(number) ? (
        <span className="page-link disabled">
          {number === "ellipsis-h" && "···"}
        </span>
      ) : (
        <Link
          to={`${
            number === 1 || number === 0
              ? "/" + index + "/"
              : "/" + archive + "/page-" + number + "/"
          }`}
          className="page-link"
          activeClassName="active"
        >
          {icon ? <FontAwesomeIcon icon={icon} /> : number}
        </Link>
      )}
    </li>
  );
}

// ====

const Pagination = (props) => {
  const { numPages, currentPage, maxButtons, showArrows, archive, index } =
    props;
  // If they have set maxButtons to 8 then we need to...
  let numberPaginationItems = maxButtons - 4; // Take two off for the 1st and last button and two for the ellipsis
  if (showArrows === true) {
    numberPaginationItems -= 2; // Take two off if the arrows are present
  }

  function isOdd(num) {
    return num % 2;
  }
  let startPage = 3;
  let endPage = numPages - 2;

  if (numberPaginationItems >= numPages - 4) {
    // Nothing here
    startPage = 3;
    endPage = numPages - 2;
  } else {
    // Only do this logic if we need to (eg. the number of requested items fits into the maths)
    let startOffset = 0;
    if (!isOdd(numberPaginationItems)) {
      startOffset = 1; // If the number is an even number, then offset the start number to make the total number of pageinated items correct
    }
    startPage =
      currentPage - Math.floor(numberPaginationItems / 2) + startOffset;
    if (startPage <= 2) {
      startPage = 3;
    }

    endPage = startPage + numberPaginationItems - 1;

    if (endPage >= numPages - 1) {
      startPage = numPages - numberPaginationItems - 1;
      endPage = startPage + numberPaginationItems - 1;
    }
  }

  const paginationItems = []; // Start the array

  for (var i = startPage; i <= endPage; i++) {
    paginationItems.push(i);
  }

  let startEllipsis = "ellipsis-h";
  if (startPage === 2 || startPage === 3) {
    startEllipsis = 2;
  }

  let endEllipsis = "ellipsis-h";
  if (endPage >= numPages - 2) {
    endEllipsis = numPages - 1;
  }

  const paginatedList = paginationItems.map((number) => (
    <ListItem
      number={number}
      currentPage={currentPage}
      lastPage={numPages}
      archive={archive}
      index={index}
    />
  ));

  return (
    <section>
      <div className="container py-5">
        <nav
          className="row justify-content-center"
          aria-label="Page navigation example"
        >
          <ul className="pagination justify-content-center">
            {showArrows && (
              <ListItem
                number={currentPage - 1}
                currentPage={currentPage}
                lastPage={numPages}
                icon="angle-left"
                archive={archive}
                index={index}
              />
            )}
            <ListItem
              number={1}
              currentPage={currentPage}
              lastPage={numPages}
              archive={archive}
              index={index}
            />
            {numPages > 2 && ( // We don't need this button if there are less than two
              <ListItem
                number={startEllipsis}
                currentPage={currentPage}
                lastPage={numPages}
                archive={archive}
                index={index}
              />
            )}
            {paginatedList}
            {numPages > 3 && ( // We don't need this button if there are less than three page
              <ListItem
                number={endEllipsis}
                currentPage={currentPage}
                lastPage={numPages}
                archive={archive}
                index={index}
              />
            )}
            <ListItem
              number={numPages}
              currentPage={currentPage}
              lastPage={numPages}
              archive={archive}
              index={index}
            />
            {showArrows && (
              <ListItem
                number={currentPage + 1}
                currentPage={currentPage}
                lastPage={numPages}
                icon="angle-right"
                archive={archive}
                index={index}
              />
            )}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Pagination;

// ====

ListItem.propTypes = {
  number: PropTypes.number,
  currentPage: PropTypes.number,
  icon: PropTypes.string,
  lastPage: PropTypes.number,
  archive: PropTypes.string,
  index: PropTypes.string,
};
ListItem.defaultProps = {
  number: null,
  currentPage: null,
  icon: null,
  lastPage: null,
  archive: "archive",
  index: "news",
};

Pagination.propTypes = {
  showArrows: PropTypes.bool,
  maxButtons: PropTypes.number,
  numPages: PropTypes.number,
  currentPage: PropTypes.number,
  archive: PropTypes.string,
  index: PropTypes.string,
};
Pagination.defaultProps = {
  showArrows: true,
  maxButtons: 9,
  numPages: 1,
  currentPage: 1,
  archive: "archiveid",
  index: "newsid",
};
