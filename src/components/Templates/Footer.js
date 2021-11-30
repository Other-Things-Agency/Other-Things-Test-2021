import React from "react";
import PropTypes from "prop-types";
import SmartText from "../../utils/TextHandler";
import SocialLinks from "../Global/SocialLinks";
import Background from "../Global/Background";

const Footer = (props) => {
  const { settings } = props;

  return (
    <>
      <Background
        src={settings.background_apps?.filename}
        sm="700x300"
        md="700x300"
        lg="1400x600"
        className="d-flex justify-items-center py-5"
      >
        <div className="container py-5">
          <div className="row justify-content-center align-items-center py-5">
            {settings.apps.map((item, idx) => {
              return (
                <div className="col-12 text-center col-md-auto py-3">
                  <a
                    href={item.link && item.link}
                    target="_blank"
                    className="brand-link-hover"
                  >
                    <img
                      src={item.image?.filename}
                      alt={item.title && item.title}
                      height="60"
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </Background>
      <footer className="w-100 py-5 small brand-background-black brand-text-white">
        <div className="container-fluid">
          <div className="row align-items-center row-cols-1 row-cols-md-2">
            <div className="col text-start brand-footer-terms small d-flex flex-row align-items-center">
              <SmartText
                content={settings.footer}
                mode="simple"
                className="col-auto border"
              />
            </div>
            <div className="col text-center text-md-end">
              <SocialLinks
                className="brand-text-white m-0"
                itemClassName="mx-3 mx-lg-0 ms-lg-3 fs-2"
                links={[
                  ["facebook", settings.facebook],
                  ["twitter", settings.twitter],
                  ["instagram", settings.instagram],
                  ["linkedin", settings.linkedin],
                ]}
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

Footer.propTypes = {
  settings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Footer.defaultProps = {
  settings: null,
};
