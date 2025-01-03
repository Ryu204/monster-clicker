import game1 from "./game1.ogg";
import game2 from "./game2.ogg";
import game3 from "./game3.ogg";
import game4 from "./game4.ogg";
import menu1 from "./menu1.ogg";
import menu2 from "./menu2.ogg";
import menu3 from "./menu3.ogg";
import menu4 from "./menu4.ogg";

const music: { [key: string]: { [key: string]: string } } = {
  game: { game1, game2, game3, game4 },
  menu: { menu1, menu2, menu3, menu4 },
};

export default music;
