import React from "react";
import PropTypes from "prop-types";
import CookieConsent from "react-cookie-consent";
import SmartText from "../../utils/TextHandler";
import Link from "./Link";

// ====

const CookiesNotice = (props) => {
  const { message } = props;

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Okay"
        cookieName="gdpr-google-analytics"
        disableStyles
        ButtonComponent={({ children, ...props }) => (
          <Link
            rel="nofollow noopener noreferrer"
            id="cookieBarButton"
            button="real"
            icon="check"
            to
            {...props}
          >
            {children}
          </Link>
        )}
        containerClasses="fixed-bottom brand-background-black brand-text-white brand-link-fuschia p-3 align-items-center row brand-cookiebar"
        contentClasses="col-12 col-md-8 mt-3 mb-3 mb-md-0 text-center text-md-start"
        buttonWrapperClasses="col-12 col-md-4 text-center text-md-end"
        expires={150}
      >
        <SmartText>{message}</SmartText>
      </CookieConsent>
    </>
  );
};

export default CookiesNotice;

CookiesNotice.propTypes = {
  message: PropTypes.string,
  mode: PropTypes.string,
};

CookiesNotice.defaultProps = {
  message: "By using this website you consent to our use of cookies",
  mode: "normal",
};
