import bgr1Url from "./backgrounds/1.png";
import bgr2Url from "./backgrounds/2.png";
import bgr3Url from "./backgrounds/3.png";
import bgr4Url from "./backgrounds/4.png";
import bgr5Url from "./backgrounds/5.png";
import bgr6Url from "./backgrounds/6.png";
import primaryButtonUrl from "./ui/primary.png";
import mainMenuMusicUrl from "./music/main_menu.ogg";

const assets = {
  backgrounds: [bgr1Url, bgr2Url, bgr3Url, bgr4Url, bgr5Url, bgr6Url],
  randomBackground: () => {
    return assets.backgrounds[
      Math.floor(Math.random() * assets.backgrounds.length)
    ];
  },
  mainMenuMusic: mainMenuMusicUrl,
  primaryButton: {
    url: primaryButtonUrl,
    width: 192,
    height: 64,
  },
};

export default assets;
