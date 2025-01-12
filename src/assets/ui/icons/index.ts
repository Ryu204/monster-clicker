import play from "./playBtn.png";
import home from "./homeBtn.png";
import restart from "./restoreBtn.png";
import share from "./shareIcon.png";
import settings from "./settingsBtn.png";
import rankings from "./ranking.png";
import question from "./question.png";

export enum Icon {
  play = "play",
  home = "home",
  restart = "restart",
  share = "share",
  settings = "settings",
  rankings = "rankings",
  question = "question",
}

export const icons: Record<Icon, string> = {
  play,
  home,
  restart,
  share,
  settings,
  rankings,
  question,
};
