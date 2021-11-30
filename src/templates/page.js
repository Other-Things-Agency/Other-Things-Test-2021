import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/Templates/Layout";
import SEO from "../utils/SEO";
import SmartText from "../utils/TextHandler";
// ====

const Page = (props) => {
  const { pageContext, blok } = props;
  let doc;
  if (pageContext) {
    doc = JSON.parse(pageContext.story.content);
  } else {
    doc = blok;
  }
  const openGraph = {
    type: "website",
    title: doc.title,
    description: doc.body,
    image: doc.image,
  };

  return (
    <Layout>
      <SEO openGraph={openGraph} meta={doc.meta} />
      <section className="py-5">
        <div className="container">
          {doc.title && (
            <h1 className="brand-font brand-text-blue">{doc.title}</h1>
          )}
          {doc.body && <SmartText>{doc.body}</SmartText>}
        </div>
      </section>
    </Layout>
  );
};

export default Page;

Page.propTypes = {
  pageContext: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  blok: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Page.defaultProps = {
  pageContext: null,
  blok: null,
};
