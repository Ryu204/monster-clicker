import { Types, Game, AUTO, Scale } from "phaser";
import MenuScene from "./scenes/menuScene";
import { gameSize } from "./constants";
import BootScene from "./scenes/bootScene";
import GameScene from "./scenes/gameScene";
import WebFont from "webfontloader";
import { GameOverScene } from "./scenes/gameOverScene";

function startGame(): void {
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
      mode: Scale.ScaleModes.EXPAND,
    },
    physics: {
      arcade: {
        gravity: { x: 0, y: 9.8 },
        debug: false,
      },
    },
    input: {
      activePointers: 1,
    },
    pixelArt: true,
    powerPreference: "low-power",
    autoMobilePipeline: true,
    scene: [BootScene, MenuScene, GameScene, GameOverScene],
  };

  new Game(config);
}

WebFont.load({
  active: startGame,
  custom: { families: ["Primary", "Pixel"] },
});
