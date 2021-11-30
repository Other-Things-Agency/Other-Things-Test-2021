import React from "react";
import PropTypes from "prop-types";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TumblrShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { Translation } from "../../utils/PageInfoTranslator";

// ====

const ShareLinks = (props) => {
  const {
    meta,
    openGraph,
    facebook,
    messenger,
    twitter,
    linkedin,
    pinterest,
    reddit,
    tumblr,
    whatsapp,
    email,
  } = props;

  const iconSize = 30;

  const page = Translation(meta, openGraph);

  return (
    <>
      {page && (
        <ul className="list-inline">
          {facebook && (
            <li className="list-inline-item">
              <FacebookShareButton
                url={page.url}
                quote={page.socialTitle}
                description={page.description}
              >
                <FacebookIcon size={iconSize} round />
              </FacebookShareButton>
            </li>
          )}
          {messenger && (
            <li className="list-inline-item">
              <FacebookMessengerShareButton
                appId="null"
                url={page.url}
                redirectUri={page.url}
              >
                <FacebookMessengerIcon size={iconSize} round />
              </FacebookMessengerShareButton>
            </li>
          )}
          {twitter && (
            <li className="list-inline-item">
              <TwitterShareButton
                url={page.url}
                title={page.socialTitle}
                via={page.twitter}
                description={page.description}
              >
                <TwitterIcon size={iconSize} round />
              </TwitterShareButton>
            </li>
          )}
          {linkedin && (
            <li className="list-inline-item">
              <LinkedinShareButton
                url={page.url}
                title={page.socialTitle}
                summary={page.description}
                description={page.description}
                source={page.url}
              >
                <LinkedinIcon size={iconSize} round />
              </LinkedinShareButton>
            </li>
          )}
          {pinterest && (
            <li className="list-inline-item">
              <PinterestShareButton
                url={page.url}
                media={page.imageSquare}
                description={page.description}
              >
                <PinterestIcon size={iconSize} round />
              </PinterestShareButton>
            </li>
          )}
          {tumblr && (
            <li className="list-inline-item">
              <TumblrShareButton
                url={page.url}
                title={page.socialTitle}
                caption={page.description}
                posttype="link"
              >
                <TumblrIcon size={iconSize} round />
              </TumblrShareButton>
            </li>
          )}
          {reddit && (
            <li className="list-inline-item">
              <RedditShareButton
                url={page.url}
                title={`${page.socialTitle} - ${page.siteName}`}
                description={page.description}
              >
                <RedditIcon size={iconSize} round />
              </RedditShareButton>
            </li>
          )}
          {whatsapp && (
            <li className="list-inline-item">
              <WhatsappShareButton
                url={page.url}
                title={`${page.socialTitle} - ${page.siteName}`}
                separator=" - "
                windowWidth="700"
              >
                <WhatsappIcon size={iconSize} round />
              </WhatsappShareButton>
            </li>
          )}
          {email && (
            <li className="list-inline-item">
              <EmailShareButton
                url={page.url}
                subject={`${page.socialTitle} - ${page.siteName}`}
                body={page.description}
                separator=" - "
              >
                <EmailIcon size={iconSize} round />
              </EmailShareButton>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default ShareLinks;

// ====

ShareLinks.propTypes = {
  meta: PropTypes.arrayOf,
  openGraph: PropTypes.arrayOf,
  facebook: PropTypes.bool,
  messenger: PropTypes.bool,
  twitter: PropTypes.bool,
  linkedin: PropTypes.bool,
  pinterest: PropTypes.bool,
  reddit: PropTypes.bool,
  tumblr: PropTypes.bool,
  whatsapp: PropTypes.bool,
  email: PropTypes.bool,
};
ShareLinks.defaultProps = {
  meta: null,
  openGraph: null,
  facebook: false,
  messenger: false,
  twitter: false,
  linkedin: false,
  pinterest: false,
  reddit: false,
  tumblr: false,
  whatsapp: false,
  email: false,
};
