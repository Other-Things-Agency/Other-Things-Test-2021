module.exports = {
  siteMetadata: {
    siteUrl: "https://www.otherthings.xyz",
    title: "Rival Teams Test",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Rival Teams",
        short_name: "Rival Teams",
        description: "This is a description for the test",
        homepage_url: "https://otherthings.xyz",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#465d67",
        display: "standalone",
        icon: "src/images/icon.svg",
      },
    },
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: "hRaiIPYb8aVrNEBdTqarNAtt",
        resolveLinks: "story",
        resolve_links: "url",
        homeSlug: "home",
        resolveRelations: [],
        version: process.env.NODE_ENV === `production` ? `published` : `draft`,
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: "", // leave empty if you want to disable the tracker
          cookieName: "gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        googleTagManager: {
          trackingId: "", // leave empty if you want to disable the tracker
          cookieName: "gdpr-google-tagmanager", // default
          dataLayerName: "dataLayer", // default
        },
        facebookPixel: {
          pixelId: "", // leave empty if you want to disable the tracker
          cookieName: "gdpr-facebook-pixel", // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    {
      resolve: `gatsby-plugin-force-trailing-slashes`,
      options: {
        excludedPaths: [`/404.html`],
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: 0,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts-v2`,
      options: {
        fonts: [
          {
            family: "Gothic A1",
            weights: ["700"],
          },
        ],
      },
    },
    "gatsby-plugin-portal",
    "gatsby-plugin-sass",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
  ],
};
