export default function SmartImage(src, option, bypass = false) {
  if (src) {
    //const imageService = '//img2.storyblok.com/';
    let imageService = "https://otherthings.netlify.app/images/";
    if (bypass === true) {
      imageService = "https://otherthings.netlify.app/static/";
    }

    const path = src.toString().replace("https://a.storyblok.com", "");

    let size;
    if (!option) {
      size = "";
    } else {
      size = option;
    }

    return imageService + size + path;
  }
  return "/404.jpeg";
}