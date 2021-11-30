import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Templates/Layout";
import SEO from "../utils/SEO";
import SmartText from "../utils/TextHandler";

const openGraph = {
  type: "website",
  title: "404 Page",
  description: "The description of the page",
};

// Markup
const FourOhFourPage = (props) => {
  const { data } = props;

  let doc;
  if (data) {
    doc = JSON.parse(data.index.content);
  }
  const openGraph = {
    type: "website",
    title: doc.name,
    description: doc.description,
  };

  return (
    <Layout>
      <SEO openGraph={openGraph} />
      <section>
        <div className="container">
          <div className="alert alert-info" role="alert">
            This is the <i>404</i> template and one of the only pages created in
            the <i>src</i> folder. The data is still pulled from storyblok. Edit
            it at <code>src/pages/404.js</code>
          </div>
          {doc.error_title && <h1 className="brand-font">{doc.error_title}</h1>}
          {doc.error_body && <SmartText>{doc.error_body}</SmartText>}
        </div>
      </section>
      <section>
        <div className="container py-5 small">
          <h3>Debug: data pulled from Storyblock:</h3>
          <code>{JSON.stringify(doc)}</code>
        </div>
      </section>
    </Layout>
  );
};

export default FourOhFourPage;

export const QUERY = graphql`
  query FourOhFourPageQuery {
    index: storyblokEntry(slug: { eq: "settings" }) {
      content
    }
  }
`;
