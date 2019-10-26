import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-plugin-transition-link/AniLink';

import '../styles/nav.scss';

const Pagination = props => {
  const { prevPath, nextPath, currentPage, numPages } = props;
  return (
    <nav className="nav">
      {prevPath ? (
        <Link
          cover
          direction="right"
          bg="#1b1c1e"
          to={prevPath}
          className="nav--item__prev"
        >
          Previous
        </Link>
      ) : null}
      <span>
        {currentPage} / {numPages}
      </span>
      {nextPath ? (
        <Link
          cover
          direction="left"
          bg="#1b1c1e"
          to={nextPath}
          className="nav--item__next"
        >
          Next
        </Link>
      ) : null}
    </nav>
  );
};

Pagination.propTypes = {
  prevPath: PropTypes.string,
  nextPath: PropTypes.string,
  currentPage: PropTypes.number,
  numPages: PropTypes.number,
};

export default Pagination;
