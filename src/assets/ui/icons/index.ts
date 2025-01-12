import play from "./playBtn.png";
import home from "./homeBtn.png";
import restart from "./restoreBtn.png";
import share from "./shareIcon.png";
import settings from "./settingsBtn.png";
import rankings from "./ranking.png";
import question from "./question.png";
import music from "./musicBtn.png";
import soundOn from "./soundOnBtn.png";
import plus from "./plusIcon.png";
import minus from "./minusIcon.png";

export enum Icon {
  play = "play",
  home = "home",
  restart = "restart",
  share = "share",
  settings = "settings",
  rankings = "rankings",
  question = "question",
  music = "music",
  soundOn = "soundOn",
  plus = "plus",
  minus = "minus",
}

export const icons: Record<Icon, string> = {
  play,
  home,
  restart,
  share,
  settings,
  rankings,
  question,
  music,
  soundOn,
  plus,
  minus,
};
