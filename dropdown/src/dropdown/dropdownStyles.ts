import { SxProps, Theme } from "@mui/material";

export const BORDER_ROUND_RADIUS = "25px";
export const textOverflow = (): SxProps<Theme> => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
