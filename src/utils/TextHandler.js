/* eslint-disable react/no-danger */
import React from "react";
import PropTypes from "prop-types";
import * as sanitizeHtml from "sanitize-html";
import ReactMarkdown from "react-markdown";
import SbResolve from "./SbResolve";

// ====

function cleanTheText(dirty, mode) {
  if (mode === "text") {
    dirty = sanitizeHtml(dirty, {
      allowedTags: [],
      allowedAttributes: {},
    });

    return dirty.replace(/\n/g, "----"); // Replace new lines with a space
  }

  return sanitizeHtml(dirty, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "b",
      "i",
      "em",
      "strong",
      "strikethrough",
      "s",
      "a",
      "p",
      "span",
      "ul",
      "ol",
      "li",
      "u",
      "hr",
      "img",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "target", "alt"],
      span: ["class"],
      img: ["src", "alt", "width", "height", "style", "class"],
    },
    allowedIframeHostnames: ["www.youtube.com"],
  });
}

const SmartText = (props) => {
  const { children, content, method, limit, ellipsis } = props;

  // children / content   :: The variables sent in
  // method               :: "auto" | "text"
  // limit                :: The number of characters to limit the output to
  // ellipsis             :: The string to use at the end of the limit function

  // Set up the text variables
  const text = children || content;
  let dirty = text;
  let clean = dirty;
  let delivery = "markdown";

  if (typeof dirty === "object") {
    // Run the dirty object thru the SBResolve function
    dirty = SbResolve(text);
    // Clean it up using the mode
    clean = cleanTheText(dirty, method);
    // Set the delivery mode
    delivery = "dsih";
  }

  // If we are going to limit the text
  // now is the time to do it
  if (limit !== null && clean.length > limit) {
    clean = clean.substring(0, limit) + ellipsis;
  }

  if (delivery === "dsih") {
    // Return it safely
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: clean,
        }}
      />
    );
  }

  // Otherwise return the none object text in the ReactMarkdown tags which will
  // add new lines and other basic formatting to textfields or markdown
  return (
    <ReactMarkdown
      skipHtml
      allowedElements={method === "text" ? "<nothing>" : ""}
      unwrapDisallowed
      disallowedTypes={["html", "virtualHtml", "parsedHtml"]}
    >
      {clean}
    </ReactMarkdown>
  );
};

export default SmartText;

// ====

SmartText.propTypes = {
  limit: PropTypes.number,
  method: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object,
    PropTypes.array,
  ]),
  ellipsis: PropTypes.string,
};

SmartText.defaultProps = {
  limit: null,
  method: "auto",
  ellipsis: "...",
  content: "",
};
