import React from "react";
import PropTypes from "prop-types";
import SmartImage from "../../utils/ImageHandler";

const Image = (props) => {
  const { src, sm, md, lg, alt, className } = props;

  return (
    <picture className={className}>
      {sm && (
        <source srcset={SmartImage(src, sm)} media="(max-width: 767.98px)" />
      )}
      {md && (
        <source srcset={SmartImage(src, md)} media="(max-width: 991.98px)" />
      )}
      {lg && <source srcset={SmartImage(src, lg)} />}
      <img src={SmartImage(src, lg)} alt={alt} className={className} />
    </picture>
  );
};

export default Image;

Image.propTypes = {
  settings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Image.defaultProps = {
  settings: null,
};