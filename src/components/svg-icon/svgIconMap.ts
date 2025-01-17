import gearwheel from "@/assets/svg-icons/gearwheel.svg?raw";
import plus from "@/assets/svg-icons/plus.svg?raw";
import refresh from "@/assets/svg-icons/refresh.svg?raw";
import shrink from "@/assets/svg-icons/shrink.svg?raw";

export const svgIconMap = <const>{
  gearwheel,
  plus,
  refresh,
  shrink,
};

export type SvgIconType = keyof typeof svgIconMap;
