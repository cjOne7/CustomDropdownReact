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
        alignItems: "center",
        borderRadius: "25px",
        background: "linear-gradient(90deg, rgba(108,242,158,1) 0%, rgba(143,211,244,1) 100%)",
        ...sx,
      }}
      {...otherStackProps}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "hidden",
          borderRadius: "25px",
          p: "10px 15px",
          width: "inherit",
          color: isMenuShown ? "#7dabf5" : "#f1f2f2",
          "&:hover": {
            cursor: "pointer",
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
              fontWeight: "bold",
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
          alignItems: "center",
          justifyContent: "center",
          display: isMenuShown ? "block" : "none",
          borderRadius: "25px",
          p: "12px",
          pt: 0,
        }}
        spacing="5px"
      >
        {options.map((option) => (
          <Stack
            key={option.value}
            sx={{
              // width: "inherit",
              borderRadius: "25px",
              p: "10px 15px",
              bgcolor: "white",
              borderTop: "none",
              cursor: "pointer",
              boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.64)",
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
