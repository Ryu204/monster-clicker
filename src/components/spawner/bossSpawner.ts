import { Scene } from "phaser";
import { spritesheets } from "../../assets";
import EnemyType from "../../data/enemyType";
import { bossSpritesheets } from "../../assets/animations";

export default class BossSpawner {
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
    this.createCutscene();
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
    let boss = this.scene.add
      .sprite(centerX + 400, centerY - 300, EnemyType.boss)
      .setOrigin(0.5, 1)
      .setScale(4)
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
    const spawnRealBoss = () => {};
    const focusOnBoss = () => {
      minions.forEach((e) => e.destroy());
      minions.length = 0;
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
          this.scene.time.delayedCall(1000, () => {
            this.scene.tweens.add({
              targets: [wipeUp, wipeDown],
              progress: 0,
              ease: "Power3",
              duration: 500,
              onComplete: () => {
                this.scene.cameras.main.postFX.clear();
                spawnRealBoss();
              },
            });
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
      this.scene.time.delayedCall(
        500,
        minions[0].play,
        [spritesheets.wisp.anims.die.name],
        minions[0]
      );
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
