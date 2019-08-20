import React from "react"
import Link from "gatsby-plugin-transition-link/AniLink";

import '../styles/nav.scss';

const Pagination = (props) => {
  const { prevPath, nextPath, currentPage, numPages } = props;

  return numPages > 1
    ? (
        <nav className="nav">
          {prevPath ? (
            <Link cover direction="right" bg="#1b1c1e" to={prevPath} className="nav--item__prev">
              Previous
            </Link>
          ) : null}
          <span>{currentPage} / {numPages}</span>
          {nextPath ? (
            <Link cover direction="left" bg="#1b1c1e" to={nextPath} className="nav--item__next">
              Next
            </Link>
          ) : null}
        </nav>
    )
    : null;
};


export default Pagination
