import React from "react";
import PropTypes from "prop-types";
import SmartImage from "../../utils/ImageHandler";

const Background = (props) => {
  const { src, sm, md, lg, alt, className, children, element, fixed, top } =
    props;

  let small,
    medium,
    large = md || lg || sm;

  if (element === "div") {
    return (
      <div
        className={`brand-background-responsive ${
          fixed === true ? "brand-background-fixed" : ""
        } ${top === true ? "brand-background-static" : ""} ${
          className && className
        }`}
        style={{
          "--bgSm": `url(${SmartImage(src && src, small)})`,
          "--bgMd": `url(${SmartImage(src && src, medium)})`,
          "--bgLg": `url(${SmartImage(src && src, large)})`,
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <section
      className={`brand-background-responsive ${
        fixed === true ? "brand-background-fixed" : ""
      } ${className && className}`}
      style={{
        "--bgSm": `url(${SmartImage(src && src, small)})`,
        "--bgMd": `url(${SmartImage(src && src, medium)})`,
        "--bgLg": `url(${SmartImage(src && src, large)})`,
      }}
    >
      {children}
    </section>
  );
};

export default Background;

Background.propTypes = {
  src: PropTypes.string,
  sm: PropTypes.string,
  md: PropTypes.string,
  lg: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fixed: PropTypes.bool,
};

Background.defaultProps = {
  src: "",
  sm: "1920x1080",
  md: "1920x1080",
  lg: "1920x1080",
  alt: "",
  className: "",
  fixed: false,
};
