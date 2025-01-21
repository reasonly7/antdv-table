import gearwheel from "@/assets/svg-icons/gearwheel.svg?raw";
import plus from "@/assets/svg-icons/plus.svg?raw";
import refresh from "@/assets/svg-icons/refresh.svg?raw";
import shrink from "@/assets/svg-icons/shrink.svg?raw";
import holder from "@/assets/svg-icons/holder.svg?raw";
import verticalAlignTop from "@/assets/svg-icons/vertical-align-top.svg?raw";
import verticalAlignMiddle from "@/assets/svg-icons/vertical-align-middle.svg?raw";
import verticalAlignBottom from "@/assets/svg-icons/vertical-align-bottom.svg?raw";

export const svgIconMap = <const>{
  gearwheel,
  plus,
  refresh,
  shrink,
  holder,
  "vertical-align-top": verticalAlignTop,
  "vertical-align-middle": verticalAlignMiddle,
  "vertical-align-bottom": verticalAlignBottom,
};

export type SvgIconType = keyof typeof svgIconMap;
