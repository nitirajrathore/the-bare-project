
import { IHighlightingPattern, IColoringPattern } from "./types/types";
export const METRICS_CONFIG = "formattingRules";
export const MAX_QUICK_RATIOS = "maxQuickRatios";
export const SETTINGS = "settings";

export const SettingKeys = {
  HIGHLIGHTING_PATTERN: "highlightingPattern",
  COLORING_PATTERN: "coloringPattern",
}

export const HighlightingPatterns = {
  Number: "number",
  Value: "value",
  // ValueCell: "valueCell",
  Block: "block",
}

export const ColoringPatterns = {
  Mono: "mono",
  Gradient: "gradient",
}

export const HighlightingPatternList = [
  {
    name: HighlightingPatterns.Number,
    displayName: "Number",
    description: "Highlight the number itself",
    image: "number.png",
  },
  {
    name: HighlightingPatterns.Value,
    displayName: "Value",
    description: "Highlight the number including the unit",
    image: "value.png",
  },
  // {
  //   name: HighlightingPatterns.ValueCell,
  //   displayName: "Value Cell",
  //   description: "Highlight the right half of the block",
  //   image: "value.png",
  // },
  {
    name: HighlightingPatterns.Block,
    displayName: "Block",
    description: "Highlight the entire block including the metric name",
    image: "block.png",

  }
] as IHighlightingPattern[];


export const ColoringPatternList = [
  {
    name: ColoringPatterns.Mono,
    displayName: "Mono",
    description: "Solid color",
    image: "mono.png",
  },
  {
    name: ColoringPatterns.Gradient,
    displayName: "Gradient",
    description: "Gradient from white to the color",
    image: "gradient.png",
  }
] as IColoringPattern[];
