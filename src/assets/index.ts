import bgr1Url from "./backgrounds/1.png";
import bgr2Url from "./backgrounds/2.png";
import bgr3Url from "./backgrounds/3.png";
import bgr4Url from "./backgrounds/4.png";
import bgr5Url from "./backgrounds/5.png";
import bgr6Url from "./backgrounds/6.png";
import heartUrl from "./ui/heart.png";
import swordUrl from "./ui/sword.png";
import particleUrl from "./textures/particles.png";
import "./fonts.css";
import music from "./music";
import { randomOne } from "../utils/math";
import {
  AnimationConfig,
  AnimationActionConfig,
  spritesheets,
} from "./animations";
import { buttons, ButtonColor, ButtonType } from "./ui/buttons";
import { icons, Icon } from "./ui/icons";
import whiteBackgroundUrl from "./ui/whiteBG.png";
import swordUiUrl from "./ui/swordIcon.png";
import titleUrl from "./ui/title.png";
import sliderUrl from "./ui/slider2.png";
import musicThumbUrl from "./ui/musicThumb.png";
import soundOnThumbUrl from "./ui/soundOnThumb.png";
import plusThumbUrl from "./ui/plusThumb.png";
import minusThumbUrl from "./ui/minusThumb.png";

const assets = {
  backgrounds: [bgr1Url, bgr2Url, bgr3Url, bgr4Url, bgr5Url, bgr6Url],
  randomBackground: () => {
    return assets.backgrounds[
      Math.floor(randomOne() * assets.backgrounds.length)
    ];
  },
  heart: heartUrl,
  sword: {
    height: 32,
    width: 32,
    column: 6,
    row: 5,
    url: swordUrl,
  },
  particles: {
    size: 32,
    row: 8,
    column: 9,
    url: particleUrl,
  },
  swordUi: swordUiUrl,
  music,
  whiteBackground: whiteBackgroundUrl,
  title: titleUrl,
  slider: sliderUrl,
  musicThumb: musicThumbUrl,
  soundOnThumb: soundOnThumbUrl,
  plusThumb: plusThumbUrl,
  minusThumb: minusThumbUrl,
};

export default assets;
export { spritesheets, buttons, icons, ButtonType, ButtonColor, Icon };
export type { AnimationConfig, AnimationActionConfig };
