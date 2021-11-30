import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "./Link";

// ====

const SocialLinks = (props) => {
  const { links, className, itemClassName, mode } = props;

  return (
    <ul
      className={`list-unstyled ${mode === "inline" ? "list-inline" : ""} ${
        className && className
      }`}
    >
      {links.map((item) => {
        let icon = ["fab", item[0]];
        if (item[0] === "forums") {
          icon = ["fas", "comments"];
        }
        return (
          <>
            {item[1] && (
              <li
                className={`${mode === "inline" ? "list-inline-item" : ""} ${
                  itemClassName && itemClassName
                }`}
              >
                <Link
                  newWindow
                  to={item[1]}
                  aria-label={`External link to ${item[0]}`}
                >
                  <FontAwesomeIcon icon={icon} />
                </Link>
              </li>
            )}
          </>
        );
      })}
    </ul>
  );
};

export default SocialLinks;

// ====

SocialLinks.propTypes = {
  links: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  mode: PropTypes.string,
};
SocialLinks.defaultProps = {
  links: null,
  mode: "inline",
};
