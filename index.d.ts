import { Theme as MuiTheme } from "@mui/material/styles";
declare module '@emotion/react' {
  export interface Theme extends MuiTheme {}
  declare module '*.png';
  declare module '*.mp3';
  declare module '*.svg';
  declare module '*.jpg';
}
declare module '*.avif';
declare module '*.webp';