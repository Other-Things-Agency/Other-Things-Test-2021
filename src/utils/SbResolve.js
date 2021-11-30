// ====================================
// Resolves Richtext fields in Storyblok
// ================

import StoryblokClient from "storyblok-js-client";
import { plugins } from "../../gatsby-config";

export default function SbResolve(content) {
  const KEY = plugins.find(
    ({ resolve }) => resolve === "gatsby-source-storyblok"
  );

  const Storyblok = new StoryblokClient({
    accessToken: KEY,
  });

  const Richtext = Storyblok.richTextResolver.render(content);

  return Richtext;
}
