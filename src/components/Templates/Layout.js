import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Footer from "./Footer";
import CookiesNotice from "../Global/CookiesNotice";
import { gsap, ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
config.autoAddCss = false;
library.add(fab, fas);

export default function Layout({ children }) {
  let siteSettings = null;

  const siteData = useStaticQuery(graphql`
    {
      storyblokEntry(slug: { eq: "settings" }) {
        content
      }
    }
  `);

  siteSettings = JSON.parse(siteData.storyblokEntry.content);

  return (
    <>
      <Header settings={siteSettings} />
      <main className="brand-main-content">{children}</main>
      <Footer settings={siteSettings} />
      <CookiesNotice message={siteSettings.cookies} />
    </>
  );
}
//      <CookiesNotice message={siteSettings.cookies} />
