import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Stack, StackProps, Typography } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";

import ReactIconSvg from "../assets/react.svg?react";
import { textOverflow } from "./dropdownStyles.ts";

interface DropdownValue {
  value: string;
  text: string;
  icon?: ReactElement;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownValue[];
  mainPlaceholder: string;
  onValueChange: (value: DropdownValue["value"]) => void;
  value?: DropdownValue["value"];
}

export const Dropdown = (props: DropdownProps & StackProps): ReactElement => {
  const { options, value, onValueChange, mainPlaceholder, ...stackProps } = props;
  const { sx, ...otherStackProps } = stackProps;
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DropdownProps["value"]>(value);

  const handleMenuClick = (): void => {
    setIsMenuShown(!isMenuShown);
  };

  const getDropdownMenuButtonValue = (): DropdownValue["text"] => {
    let text: string | undefined;
    if (selectedValue) {
      text = options.find((option) => option.value === selectedValue)?.text;
    }
    return text ?? mainPlaceholder;
  };

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <Stack
      sx={{
        position: "relative",
        width: "100%",
        ...sx,
      }}
      spacing="10px"
      {...otherStackProps}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          border: "1px solid black",
          borderRadius: "8px",
          p: "10px 15px",
          bgcolor: "darkblue",
          width: "inherit",
          color: isMenuShown ? "white" : "#b8becc",
          "&:hover": {
            cursor: "pointer",
            bgcolor: "darkblue",
            color: "white",
          },
        }}
        onClick={handleMenuClick}
      >
        <Stack
          direction="row"
          spacing="10px"
          sx={{
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <ReactIconSvg
            style={{
              minWidth: "20px",
              minHeight: "20px",
              width: "20px",
              height: "20px",
            }}
          />
          <Typography
            variant="body1"
            title={mainPlaceholder}
            sx={{
              color: "inherit",
              ...textOverflow(),
            }}
          >
            {getDropdownMenuButtonValue()}
          </Typography>
        </Stack>
        {isMenuShown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Stack>

      <Stack
        sx={{
          width: "inherit",
          display: isMenuShown ? "block" : "none",
        }}
      >
        {options.map((option) => (
          <Stack
            key={option.value}
            sx={{
              width: "inherit",
              borderRadius: "8px",
              p: "10px 15px",
              bgcolor: "lightgray",
              border: "1px solid black",
              borderTop: "none",
              cursor: "pointer",
              "&:first-of-type": {
                borderTop: "1px solid black",
              },
            }}
            onClick={() => {
              onValueChange(option.value);
              setSelectedValue(option.value);
            }}
          >
            <Typography variant="body1" title={option.text} sx={textOverflow()}>
              {option.text}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
