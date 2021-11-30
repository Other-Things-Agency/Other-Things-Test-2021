module.exports = function FileHandler(src) {
  if (src) {
    const fileService = "//img2.storyblok.com/";
    //const fileService = 'https://otherthings.netlify.app/downloads/';
    const path = src.replace("https://a.storyblok.com/f/87059/x", "");

    return fileService + path;
  } else {
    return null;
  }
};
