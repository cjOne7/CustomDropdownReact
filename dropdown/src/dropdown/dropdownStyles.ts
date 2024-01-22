import { SxProps, Theme } from "@mui/material";

export const textOverflow = (): SxProps<Theme> => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});
