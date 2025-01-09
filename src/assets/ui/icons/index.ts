import play from "./playBtn.png";
import home from "./homeBtn.png";
import restart from "./restoreBtn.png";
import share from "./shareIcon.png";

export enum Icon {
  play = "play",
  home = "home",
  restart = "restart",
  share = "share",
}

export const icons: Record<Icon, string> = {
  play,
  home,
  restart,
  share,
};
