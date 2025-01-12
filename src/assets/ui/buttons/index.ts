import buttonIconUrl from "./buttonIcon.png";
import buttonTextUrl from "./buttonText.png";

export enum ButtonType {
  icon = "icon",
  text = "text",
}

export enum ButtonColor {
  blue = "blue",
  green = "green",
  pink = "pink",
  purple = "purple",
  yellow = "yellow",
}

export interface ButtonFrameData {
  up: number;
  focused?: number;
  pressed?: number;
}

interface ButtonTypeData {
  url: string;
  row: number;
  width: number;
  height: number;
  scale: number;
}

export const buttons: Record<
  ButtonType,
  ButtonTypeData & Record<ButtonColor, ButtonFrameData>
> = {
  icon: {
    url: buttonIconUrl,
    row: 3,
    width: 256,
    height: 271,
    scale: 1,
    blue: { up: 0, pressed: 1 },
    green: { up: 2, pressed: 3 },
    pink: { up: 4, pressed: 5 },
    purple: { up: 6, pressed: 7 },
    yellow: { up: 8, pressed: 9 },
  },
  text: {
    url: buttonTextUrl,
    row: 4,
    width: 359,
    height: 162,
    scale: 1,
    blue: { up: 1, pressed: 2, focused: 0 },
    green: { up: 4, pressed: 5, focused: 3 },
    pink: { up: 9, pressed: 10, focused: 8 },
    purple: { up: 12, pressed: 13, focused: 11 },
    yellow: { up: 15, pressed: 16, focused: 14 },
  },
};
