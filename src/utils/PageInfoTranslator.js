import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import SbResolve from "./SbResolve";
import ImageHandler from "./ImageHandler";

const Translation = function (meta, openGraph) {
  let siteSettings = null;

  const siteData = useStaticQuery(graphql`
    {
      storyblokEntry(slug: { eq: "settings" }) {
        content
      }
    }
  `);

  function titlePath(path) {
    // Now split up the directories. Remove the first slash and split it up
    var dirs = path
      .replace(/^\/|\/$/g, "")
      .split("/")
      .reverse();
    var title = "";
    // Loop through the params and split the key and the value
    for (var i = 0; i < dirs.length; i++) {
      title += titleCase(dirs[i]) + " | ";
    }
    return title;
  }

  function titleCase(str) {
    let strLowerCase = str.toLowerCase();
    let wordArr = strLowerCase.split(" ").map(function (currentValue) {
      return currentValue[0].toUpperCase() + currentValue.substring(1);
    });
    return wordArr.join(" ");
  }

  siteSettings = JSON.parse(siteData.storyblokEntry.content);

  const page = [];

  page.domain = siteSettings.domain;

  const url = typeof window !== "undefined" ? window.location : page.domain;

  //  const url = "https://www.otherthingsagency.com";

  const urlObject = new URL(url);

  if (url) {
    page.url = url;
  } else {
    page.url = page.domain;
  }

  page.path = urlObject.pathname;

  page.siteName = siteSettings.name;

  const pageTitle =
    (meta && meta.title && meta.title) ||
    (openGraph && openGraph.title && openGraph.title);

  page.pageTitle = pageTitle
    ? `${pageTitle}`
    : `${titlePath(urlObject.pathname)}${page.siteName}`;

  page.socialTitle =
    (meta && meta.title && meta.title) ||
    (openGraph && openGraph.title && openGraph.title) ||
    siteSettings.name;

  page.description = siteSettings.description;
  if (openGraph && openGraph.description) {
    page.description = SbResolve(openGraph.description).replace(/<[^>]+>/g, "");
    if (page.description.length > 276) {
      page.description = `${page.description.substring(0, 280)}...`;
    }
  }
  if (meta && meta.description !== "") {
    page.description = meta.description;
  }

  page.type = (openGraph && openGraph.type && openGraph.type) || "Website";

  page.image =
    (meta && meta.image && ImageHandler(meta.image, "960x540")) ||
    (openGraph &&
      openGraph.image &&
      ImageHandler(openGraph.image.filename, "960x540")) ||
    ImageHandler(siteSettings.image.filename, "960x540");

  page.imageSquare =
    (meta && meta.image && ImageHandler(meta.image.filename, "960x960")) ||
    (openGraph &&
      openGraph.image &&
      ImageHandler(openGraph.image.filename, "960x960")) ||
    ImageHandler(siteSettings.image.filename, "960x960");

  if (openGraph && openGraph.twitter) {
    page.twitter = (openGraph.twitter && openGraph.twitter) || "";
  }

  if (openGraph && openGraph.author) {
    page.author = (openGraph.author && openGraph.author) || siteSettings.author;
  }

  return page;
};

export { Translation };
