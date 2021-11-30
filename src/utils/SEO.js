import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Translation } from "./PageInfoTranslator";

// ====

const SEO = (props) => {
  const { debug, meta, settings, openGraph } = props;

  const page = Translation(meta, openGraph);

  if (debug === true) {
    return (
      <div className="w-100 p-3 border bg-light border-warning">
        <h3>Debug Translator</h3>
        <p>
          <strong>Domain:</strong> {page.domain}
        </p>
        <p>
          <strong>Page URL:</strong> {page.url}
        </p>
        <p>
          <strong>Page path:</strong> {page.path}
        </p>
        <p>
          <strong>Page title:</strong> {page.pageTitle}
        </p>
        <p>
          <strong>Social / SEO title:</strong> {page.socialTitle}
        </p>
        <p>
          <strong>Description:</strong> {page.description}
        </p>
        <p>
          <strong>Type:</strong> {page.type ? page.type : `[No type set]`}
        </p>
        <p>
          <strong>Author:</strong>{" "}
          {page.author ? page.author : `[No author set]`}
        </p>
        <p>
          <strong>Twitter:</strong>{" "}
          {page.twitter ? page.twitter : `[No twitter handle set]`}
        </p>
        <p>
          <strong>Site name:</strong> {page.siteName}
        </p>
        <p>
          <strong>Image path:</strong>{" "}
          <span className="small">{page.image}</span>
          <br />
          <img src={page.image} width="100" alt={page.title} />
        </p>
        <p>
          <strong>Image path (square):</strong>{" "}
          <span className="small">{page.imageSquare}</span>
          <br />
          <img src={page.imageSquare} width="100" alt={page.title} />
        </p>
        <p>
          <strong>Index:</strong> {openGraph.noIndex ? `noIndex` : `Indexed`}
        </p>
      </div>
    );
  }

  return (
    <Helmet>
      <title>{page.pageTitle}</title>
      <meta name="description" content={page.description} />
      <meta property="og:url" content={`${page.url}`} />
      {page.type && <meta property="og:type" content={page.type} />}
      <meta property="og:title" content={page.socialTitle} />
      <meta property="og:description" content={page.description} />
      <meta property="og:site_name" content={page.siteName} />
      <meta property="og:image" content={page.image} />
      <meta property="og:image:alt" content={page.socialTitle} />
      <meta property="og:image:width" content="960" />
      <meta property="og:image:height" content="540" />
      {page.author && <meta property="og:author" content={page.author} />}
      {page.twitter && <meta name="twitter:site" content={page.twitter} />}
      {page.author && <meta name="twitter:creator" content={page.author} />}
      <meta name="twitter:card" content="summary_large_image" />
      {page.meta_fb_pages && (
        <meta property="fb:pages" content={page.meta_fb_pages} />
      )}

      {openGraph.noIndex === true && <meta name="robots" content="noindex" />}
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  debug: PropTypes.bool,
  meta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  settings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  openGraph: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SEO.defaultProps = {
  debug: false,
  meta: null,
  settings: null,
  openGraph: {
    title: null,
    description: "",
    richtext: true,
    author: "",
    image: "",
    type: "website",
  },
};
