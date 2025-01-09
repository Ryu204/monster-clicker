import play from "./playBtn.png";
import home from "./homeBtn.png";
import restart from "./restoreBtn.png";

export enum Icon {
  play = "play",
  home = "home",
  restart = "restart",
}

export const icons: Record<Icon, string> = {
  play,
  home,
  restart,
};
