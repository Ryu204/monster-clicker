import { Math, Scene } from "phaser";
import { spritesheets } from "../../assets";
import EnemyType from "../../data/enemyType";
import { bossSpritesheets } from "../../assets/animations";
import { fonts, game, texts } from "../../constants";
import Enemy, { Events as EnemyEvents } from "../enemy";
import enemies from "../../data/enemyData";
import { centerOnCamera } from "../../utils/layout";

export default class BossSpawner {
  private scene: Scene;
  private onBossSpawned?: Function;
  private onBossDied?: Function;

  constructor(scene: Scene, onBossSpawned?: Function, onBossDied?: Function) {
    this.scene = scene;
    this.onBossSpawned = onBossSpawned;
    this.onBossDied = onBossDied;
    this.scene.time.delayedCall(2000, this.createCutscene, [], this);
  }

  private createCutscene(): void {
    const centerX = this.scene.scale.width / 2;
    const centerY = (this.scene.scale.height / 2) * 1.3;
    const minions = [
      this.scene.add.sprite(centerX - 200, centerY, EnemyType.wisp).setScale(6),
      this.scene.add
        .sprite(centerX, centerY, EnemyType.goblin)
        .setScale(5)
        .setFlipX(true),
    ];
    const boss = this.scene.add
      .sprite(centerX + 400, centerY - 300, EnemyType.boss)
      .setOrigin(0.5, 1)
      .setScale(4)
      .setAlpha(0);
    const bossName = this.scene.add
      .text(centerX, this.scene.scale.height / 2, game.bossName, {
        fontFamily: fonts.pixel,
        fontSize: 80,
        color: texts.colors.red,
        stroke: texts.colors.black,
        strokeThickness: 40,
        wordWrap: {
          width: this.scene.scale.width * 0.8,
        },
        shadow: { color: texts.colors.deepBlue, offsetX: 20, offsetY: 20 },
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setRotation(Math.DEG_TO_RAD * 15);
    const bossBanner = this.scene.add
      .rectangle(
        0,
        0,
        this.scene.scale.width,
        this.scene.scale.height,
        0x451267
      )
      .setVisible(false)
      .setOrigin(0)
      .setDepth(boss.depth - 1);
    const bossNameRect = this.scene.add
      .rectangle(
        bossName.x,
        bossName.y,
        this.scene.scale.width * 2,
        bossName.height * 1.3,
        0x000000,
        0.5
      )
      .setOrigin(0.5)
      .setRotation(bossName.rotation)
      .setStrokeStyle(10, 0xefefef)
      .setAlpha(0);
    minions[0].play({
      key: spritesheets.wisp.anims.attack.name,
      repeat: -1,
    });
    minions[1].play({
      key: spritesheets.goblin.anims.attack.name,
      repeat: -1,
    });
    boss.play(bossSpritesheets.walk.name);

    // Read from bottom to top
    const spawnRealBoss = () => {
      const realBoss = createBoss(this.scene);
      this.onBossSpawned?.(realBoss);
      if (this.onBossDied) realBoss.on(EnemyEvents.dead, this.onBossDied, this);
    };
    const showBossName = () => {
      const oldBossNamePos = { x: bossName.x, y: bossName.y };
      const displacement = Math.Rotate(
        { x: -this.scene.scale.width / 2, y: 0 },
        bossName.rotation
      );
      bossName.setPosition(
        bossName.x + displacement.x,
        bossName.y + displacement.y
      );
      this.scene.tweens.add({
        targets: bossName,
        x: oldBossNamePos.x,
        y: oldBossNamePos.y,
        alpha: 1,
        ease: "Power2",
        duration: 500,
        onComplete: () => {
          this.scene.tweens.addMultiple([
            {
              targets: bossName,
              x: oldBossNamePos.x - displacement.x,
              y: oldBossNamePos.y - displacement.y,
              alpha: 0,
              ease: "Power2",
              duration: 500,
              delay: 1500,
            },
            {
              targets: bossNameRect,
              alpha: 0,
              ease: "Power2",
              duration: 500,
              delay: 1500,
              onComplete: () => {
                spawnRealBoss(), bossName.destroy();
                bossNameRect.destroy();
                boss.destroy();
                bossBanner.destroy();
              },
            },
          ]);
        },
      });
      this.scene.tweens.add({
        targets: bossNameRect,
        alpha: 0.5,
        ease: "Power2",
        duration: 500,
      });
    };
    const focusOnBoss = () => {
      bossBanner.setVisible(true);
      // boss.anims.pause()
      showBossName();
      const wipeUp = this.scene.cameras.main.postFX.addWipe(0, 1, 1);
      const wipeDown = this.scene.cameras.main.postFX.addWipe(0, 0, 1);
      const tween1 = this.scene.tweens.add({
        targets: boss,
        originX: bossSpritesheets.origin.x,
        originY: bossSpritesheets.origin.y,
        x: centerX,
        y: this.scene.scale.height / 2,
        duration: 1500,
        ease: "Power1",
        scale: 13,
        onComplete: () => {
          minions.forEach((e) => e.destroy());
          minions.length = 0;
          this.scene.tweens.add({
            targets: [wipeUp, wipeDown],
            progress: 0,
            ease: "Power3",
            duration: 500,
            delay: 1000,
            onComplete: () => {
              this.scene.cameras.main.postFX.clear();
            },
          });
        },
      });
      this.scene.tweens.add({
        targets: [wipeUp, wipeDown],
        progress: 0.25,
        ease: "Power3",
        duration: tween1.duration,
      });
    };
    const bossKillMinion = () => {
      boss.play(bossSpritesheets.attack.name);
      this.scene.time.delayedCall(500, () => {
        minions[0].play(spritesheets.wisp.anims.die.name);
        this.scene.cameras.main.shake(200, 0.08);
      });
      boss.once("animationcomplete", () => {
        boss.play(spritesheets.boss.anims.idle.name);
        focusOnBoss();
      });
    };
    const bossWalkIn = () =>
      this.scene.tweens.add({
        targets: boss,
        x: centerX,
        y: centerY + 200,
        scale: 9,
        alpha: 1,
        duration: 2000,
        onComplete: bossKillMinion,
      });
    const minionDie = () =>
      this.scene.time.delayedCall(2600, () => {
        minions[1].play(spritesheets.goblin.anims.die.name);
        minions[0].play(spritesheets.wisp.anims.idle.name);
        bossWalkIn();
      });

    minionDie();
  }
}

function createBoss(scene: Scene): Enemy {
  const boss = new Enemy(scene, EnemyType.boss, enemies.boss).setOrigin(
    bossSpritesheets.origin.x,
    bossSpritesheets.origin.y
  );
  centerOnCamera(boss, scene.cameras.main);

  const attackSprite = scene.add
    .sprite(0, 0, EnemyType.boss)
    .setScale(spritesheets.boss.anims.scale)
    .setOrigin(0.5, 1)
    .setDepth(boss.depth + 1)
    .setScale(10)
    .setVisible(false);
  attackSprite.on(
    "animationcomplete",
    attackSprite.setVisible.bind(attackSprite, false)
  );
  attackSprite.anims.frameRate *= 2;

  boss.on(EnemyEvents.attackFrameStarted, () => {
    attackSprite.setVisible(true);
    attackSprite.setRandomPosition();
    attackSprite.play(bossSpritesheets.cast.name);
  });

  return boss;
}
