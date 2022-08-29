import { alpha } from "@mui/material";

const ColorBacground = [
  "#F7B68E",
  "#253CA2",
  "#C62D3E",
  "#BF7E46",
  "#39ABB8",
  "#7E368E",
]
export const alfaBackground = (alfa: number, lewelDiff?: string) => {
  if (lewelDiff) return alpha(ColorBacground[+lewelDiff - 1], alfa);
};