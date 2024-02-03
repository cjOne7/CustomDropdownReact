import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Stack, StackProps, Typography, useTheme } from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";

import ReactIconSvg from "../assets/react.svg?react";
import { KeyEvent } from "../models/globalModels.ts";
import { BORDER_ROUND_RADIUS, textOverflow } from "./dropdownStyles.ts";

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
  const theme = useTheme();
  const { pxToRem } = theme.typography;
  const { options, value, onValueChange, mainPlaceholder, ...stackProps } = props;
  const { sx, ...otherStackProps } = stackProps;
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<DropdownProps["value"]>(value);

  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
    setIsMenuShown(!isMenuShown);
  };

  const getDropdownMenuButtonValue = (): DropdownValue["text"] => {
    let text: string | undefined;
    if (selectedValue) {
      text = options.find((option) => option.value === selectedValue)?.text;
    }
    return text ?? mainPlaceholder;
  };

  const handleItemClick = (
    e: React.MouseEvent<HTMLDivElement>,
    newValue: DropdownValue["value"],
  ): void => {
    e.stopPropagation();
    onValueChange(newValue);
    setSelectedValue(newValue);
  };

  useEffect(() => {
    const handleClickClose = (): void => {
      setIsMenuShown(false);
    };

    const handleButtonDownClose = (e: KeyboardEvent): void => {
      if (e.code === KeyEvent.ESCAPE) {
        setIsMenuShown(false);
      }
    };

    window.addEventListener("click", handleClickClose);
    window.addEventListener("keydown", handleButtonDownClose);
    return () => {
      window.removeEventListener("click", handleClickClose);
      window.removeEventListener("keydown", handleButtonDownClose);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  return (
    <Stack
      sx={{
        position: "relative",
        width: "100%",
        alignItems: "center",
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
          borderRadius: `${BORDER_ROUND_RADIUS} ${BORDER_ROUND_RADIUS} ${isMenuShown ? 0 : BORDER_ROUND_RADIUS} ${isMenuShown ? 0 : BORDER_ROUND_RADIUS}`,
          p: `${pxToRem(10)} ${pxToRem(15)}`,
          width: "inherit",
          color: "#fff",
          background: "linear-gradient(90deg, #f0a3f6 0%, #8ab2f6 50%, #8fd3f4 100%)",
          "&:hover": {
            cursor: "pointer",
            color: "#e1faff",
          },
        }}
        onClick={handleMenuClick}
      >
        <Stack
          direction="row"
          spacing={pxToRem(10)}
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
          position: "absolute",
          top: "100%",
          background: "linear-gradient(90deg, #f0a3f6 0%, #8ab2f6 50%, #8fd3f4 100%)",
          borderRadius: `0 0 ${BORDER_ROUND_RADIUS} ${BORDER_ROUND_RADIUS}`,
          visibility: isMenuShown ? "visible" : "hidden",
        }}
      >
        <Stack
          sx={{
            width: "inherit",
            alignItems: "center",
            justifyContent: "center",
            p: pxToRem(12),
            pt: 0,
          }}
          spacing="5px"
        >
          {options.map(({ icon, text, value }) => (
            <Stack
              key={value}
              sx={{
                width: "inherit",
                borderRadius: BORDER_ROUND_RADIUS,
                p: `${pxToRem(10)} ${pxToRem(15)}`,
                bgcolor: value === selectedValue ? "#b6f3ff" : "#fff",
                borderTop: "none",
                cursor: "pointer",
                boxShadow: "0px 2px 6px 1px rgba(0, 0, 0, 0.66)",
                fontWeight: value === selectedValue ? "bold" : "normal",
                "&:hover": {
                  bgcolor: value === selectedValue ? "#b6f3ff" : "#e1faff",
                },
              }}
              onClick={(e) => handleItemClick(e, value)}
            >
              <Stack direction="row" spacing={pxToRem(10)} alignItems="center">
                {icon}
                <Typography
                  variant="body2"
                  title={text}
                  sx={{
                    ...textOverflow(),
                    fontWeight: value === selectedValue ? "bold" : "normal",
                  }}
                >
                  {text}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
