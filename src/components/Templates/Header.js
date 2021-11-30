import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Link from "../Global/Link";

// ====

function trimSlash(path) {
  return path.replace(/\/$/, "");
}

const Header = (props) => {
  const { settings } = props;

  // Site has the pages in it!
  return (
    <header>
      <div class="container-fluid brand-background-white">
        <div className="text-center py-3 fs-3 border-bottom">GAME LOGO</div>
      </div>
    </header>
  );
};

export default Header;

Header.propTypes = {
  settings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Header.defaultProps = {
  settings: null,
};
