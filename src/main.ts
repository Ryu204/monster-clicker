import { Types, Game, AUTO, Scale } from "phaser";
import MenuScene from "./scenes/menuScene";
import { gameSize } from "./constants";
import BootScene from "./scenes/bootScene";

const config: Types.Core.GameConfig = {
  type: AUTO,
  title: "Monster clicker",
  parent: document.getElementById("canvas"),
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  scale: {
    width: gameSize.width,
    height: gameSize.height,
    autoCenter: Scale.CENTER_BOTH,
    mode: Scale.ScaleModes.ENVELOP,
  },
  physics: {
    arcade: {
      gravity: { x: 0, y: 9.8 },
      debug: false,
    },
  },
  pixelArt: true,
  powerPreference: "low-power",
  autoMobilePipeline: true,
  scene: [BootScene, MenuScene],
};
// @ts-expect-error: unused
const game = new Game(config);
