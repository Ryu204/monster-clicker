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
  bossSpritesheets,
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
import buttonUrl from "./sfx/buttonpress.ogg";
import button2Url from "./sfx/button2.mp3";
import sword1Sfx from "./sfx/sword1.mp3";
import sword2Sfx from "./sfx/sword2.mp3";
import sword3Sfx from "./sfx/sword3.mp3";
import hurt1Sfx from "./sfx/hurt.ogg";
import hurt2Sfx from "./sfx/hurt2.mp3";
import bossAttackSfx from "./sfx/bossAttack.mp3";
import bossGrowlSfx from "./sfx/bossGrowl.mp3";
import bossDieSfx from "./sfx/bossDie.mp3";
import bossSpellSfx from "./sfx/bossSpell.mp3";
import victorySfx from "./sfx/victory.mp3";
import gameOver from "./sfx/gameOver.mp3";

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
  sfx: {
    button: { url: buttonUrl, name: "button" },
    button2: { url: button2Url, name: "button2" },
    sword1: { url: sword1Sfx, name: "sword1" },
    sword2: { url: sword2Sfx, name: "sword2" },
    sword3: { url: sword3Sfx, name: "sword3" },
    hurt1: { url: hurt1Sfx, name: "hurt1" },
    hurt2: { url: hurt2Sfx, name: "hurt2" },
    bossAttack: { url: bossAttackSfx, name: "bossAttack" },
    bossGrowl: { url: bossGrowlSfx, name: "bossGrowl" },
    bossDie: { url: bossDieSfx, name: "bossDie" },
    bossSpell: { url: bossSpellSfx, name: "bossSpell" },
    victory: { url: victorySfx, name: "victory" },
    gameOver: { url: gameOver, name: "gameOver" },
  },
};

export default assets;
export {
  spritesheets,
  bossSpritesheets,
  buttons,
  icons,
  ButtonType,
  ButtonColor,
  Icon,
};
export type { AnimationConfig, AnimationActionConfig };
