import React from "react";
import PropTypes from "prop-types";
import { Link as GatsbyLink } from "gatsby";
import { AnchorLink } from "gatsby-plugin-anchor-links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ====

// Checks the path to see if there is a trailing slash. If not, it adds it!
function ensureTrailingSlashExists(path) {
  return path.endsWith("/") ? path : (path += "/");
}
function trimSlash(path) {
  return path.replace(/\/$/, "");
}

// Since DOM elements <a> cannot receive activeClassName
// and partiallyActive, destructure the prop here and
// pass it only to GatsbyLink
const Link = ({
  children,
  to,
  activeClassName,
  partiallyActive,
  icon,
  iconStart,
  className,
  button,
  stretched,
  target,
  smooth,
  ...other
}) => {
  ////////// URL //////////

  // Any internal link (intended for Gatsby)
  // will start with exactly one slash
  // anything else is external.
  let internalLink = /^\/(?!\/)/.test(to);

  // Figure out the link

  let linkUrl = to;

  if (typeof to === "string") {
    // It's a string, so just use it
    linkUrl = to;
    // If it has http in the URL then it is external
    //TODO
    // otherwise put a /slash at the start
    //TODO
  } else {
    // It's an object, so go get the actual URL...
    if (to.linktype === "url") {
      // It is an external URL, so just use it
      linkUrl = to.url;
      internalLink = false;
    } else if (to.linktype === "story") {
      // There is a story associated with this link, so go find it
      if (to.story.full_slug) {
        // Start this URL with the forward slash, cos we know it's internal
        linkUrl = "/" + to.story.full_slug;
        internalLink = true;
      } else {
        // Default back to the cached URL
        linkUrl = "/" + to.cached_url;
        internalLink = true;
      }
    }
  }

  ////////// TARGET //////////

  let linkTarget = "_self"; // Default
  if (target === "default") {
    if (internalLink === false) {
      // Default for external is _blank
      linkTarget = "_blank";
    }
  } else {
    linkTarget = target;
  }

  ////////// ICON //////////

  let iconGraphic = "";

  if (icon) {
    if (icon === true) {
      // If icon is true but not explicitly set, then set it to a default icon
      if (internalLink) {
        iconGraphic = <FontAwesomeIcon icon="chevron-right" />;
      } else {
        iconGraphic = <FontAwesomeIcon icon="external-link-alt" />;
      }
    } else {
      iconGraphic = <FontAwesomeIcon icon={icon} />;
    }
  }

  ////////// STYLE //////////

  let classButton = "";

  if (button) {
    if (button == "real") {
      return (
        <button
          type="submit"
          activeClassName={activeClassName}
          partiallyActive={partiallyActive}
          className={`btn btn-lg brand-btn ${
            stretched ? ` stretched-link` : ``
          }${className && ` ${className}`}`}
          {...other}
        >
          {icon && iconStart === true && (
            <span className={children ? "me-2" : ""}>{iconGraphic}</span>
          )}
          {children}
          {icon && iconStart === false && (
            <span className={children ? "ms-2" : ""}>{iconGraphic}</span>
          )}
        </button>
      );
    } else {
      classButton = "btn btn-lg brand-btn";
    }
  }

  if (smooth) {
    // Use Gatsby Link for internal links, and <a> for others
    return (
      <AnchorLink
        to={ensureTrailingSlashExists(trimSlash(linkUrl))}
        target={linkTarget}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        className={`${classButton}${stretched ? ` stretched-link` : ``}${
          className && ` ${className}`
        }`}
        {...other}
      >
        {icon && iconStart === true && (
          <span className={children ? "me-2" : ""}>{iconGraphic}</span>
        )}
        {children}
        {icon && iconStart === false && (
          <span className={children ? "ms-2" : ""}>{iconGraphic}</span>
        )}
      </AnchorLink>
    );
  }

  if (internalLink) {
    return (
      <GatsbyLink
        to={ensureTrailingSlashExists(linkUrl)}
        target={linkTarget}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        className={`${classButton}${stretched ? ` stretched-link` : ``}${
          className && ` ${className}`
        }`}
        {...other}
      >
        {icon && iconStart === true && (
          <span className={children ? "me-2" : ""}>{iconGraphic}</span>
        )}
        {children}
        {icon && iconStart === false && (
          <span className={children ? "ms-2" : ""}>{iconGraphic}</span>
        )}
      </GatsbyLink>
    );
  }

  return (
    // Return the default a tag if all else fails
    <a
      href={ensureTrailingSlashExists(linkUrl)}
      target={linkTarget}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      rel="noopener"
      className={`${classButton}${stretched ? ` stretched-link` : ``}${
        className && ` ${className}`
      }`}
      {...other}
    >
      {icon && iconStart === true && (
        <span className={children ? "me-2" : ""}>{iconGraphic}</span>
      )}
      {children}
      {icon && iconStart === false && (
        <span className={children ? "ms-2" : ""}>{iconGraphic}</span>
      )}
    </a>
  );
};

export default Link;

// ====

Link.propTypes = {
  to: PropTypes.string,
  activeClassName: PropTypes.string,
  partiallyActive: PropTypes.bool,
  icon: PropTypes.string,
  iconStart: PropTypes.string,
  className: PropTypes.string,
  button: PropTypes.bool,
  stretched: PropTypes.bool,
  target: PropTypes.string,
  smooth: PropTypes.bool,
};

Link.defaultProps = {
  to: "/",
  activeClassName: null,
  partiallyActive: null,
  icon: null,
  iconStart: false,
  className: "",
  button: false,
  stretched: false,
  target: "default",
  smooth: false,
};
