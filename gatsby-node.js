const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        templates: path.resolve(__dirname, "src/templates"),
        scss: path.resolve(__dirname, "src/scss"),
        images: path.resolve(__dirname, "src/images"),
      },
    },
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  const pageArray = [];

  function trimSlash(path) {
    return path.replace(/\/$/, "");
  }

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          pages: allStoryblokEntry(
            filter: { field_component: { in: ["default", "document"] } }
          ) {
            edges {
              node {
                field_component
                full_slug
                lang
                content
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        //////
        // START: BUILD ARRAYS OF CONTENT WE ARE GOING TO MAKE
        //////

        const pages = result.data.pages.edges;
        pages.forEach((entry) => {
          // We capture all generic pages in a new array so we can make them
          const data = {};

          if (entry.node.field_component === "default") {
            data.component = path.resolve(`src/templates/page.js`);
            data.path = `/${trimSlash(entry.node.full_slug)}/`;
            data.node = entry.node;
            pageArray.push(data);
          } else if (entry.node.field_component === "document") {
            data.component = path.resolve(`src/templates/page.js`);
            data.path = `/${trimSlash(entry.node.full_slug)}/`;
            data.node = entry.node;
            pageArray.push(data);
          } else {
            reject(result.errors);
          }
        });

        //////
        // END: BUILD ARRAYS OF CONTENT WE ARE GOING TO MAKE
        //////

        //////
        // START: ACTUALLY MAKE THE PAGES FROM THE ARRAYS
        //////

        pageArray.forEach(function (item, index) {
          // CREATE PAGES
          createPage({
            path: item.path,
            component: item.component,
            context: {
              story: item.node,
            },
          });
          console.log("CREATED PAGE: " + item.path);
        });
      })
    );
  });
};
