import bgr1Url from "./backgrounds/1.png";
import bgr2Url from "./backgrounds/2.png";
import bgr3Url from "./backgrounds/3.png";
import bgr4Url from "./backgrounds/4.png";
import bgr5Url from "./backgrounds/5.png";
import bgr6Url from "./backgrounds/6.png";
import primaryButtonUrl from "./ui/primary.png";
import heartUrl from "./ui/heart.png";
import swordUrl from "./ui/sword.png";
import particleUrl from "./textures/particles.png";
import golemURL from "./animations/golem.png";
import minotaurUrl from "./animations/minotaur.png";
import goblinUrl from "./animations/goblin.png";
import "./fonts.css";
import music from "./music";
import { randomOne } from "../utils/math";
import {
  AnimationConfig,
  AnimationActionConfig,
  golemAnimation,
  minotaurAnimation,
  goblinAnimation,
} from "./animations";
import EnemyType from "../data/enemyType";

const assets = {
  backgrounds: [bgr1Url, bgr2Url, bgr3Url, bgr4Url, bgr5Url, bgr6Url],
  randomBackground: () => {
    return assets.backgrounds[
      Math.floor(randomOne() * assets.backgrounds.length)
    ];
  },
  primaryButton: {
    url: primaryButtonUrl,
    width: 192,
    height: 64,
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
  golem: {
    url: golemURL,
    height: 64,
    width: 90,
    row: 5,
    column: 13,
    anims: golemAnimation,
  },
  music,
};

interface SpritesheetData {
  url: string;
  height: number;
  width: number;
  row: number;
  column: number;
  anims: AnimationConfig;
}
export default assets;
export const spritesheets: { [key in EnemyType]: SpritesheetData } = {
  golem: {
    url: golemURL,
    height: 64,
    width: 90,
    row: 5,
    column: 13,
    anims: golemAnimation,
  },
  minotaur: {
    url: minotaurUrl,
    height: 96,
    width: 96,
    row: 4,
    column: 9,
    anims: minotaurAnimation,
  },
  goblin: {
    url: goblinUrl,
    height: 150,
    width: 150,
    row: 5,
    column: 8,
    anims: goblinAnimation,
  },
};
export type { AnimationConfig, AnimationActionConfig };
