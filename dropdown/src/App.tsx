import { Stack } from "@mui/material";
import { ReactElement, useState } from "react";

import { Dropdown, DropdownProps } from "./dropdown/Dropdown.tsx";

export const App = (): ReactElement => {
  const [dropdownValue, setDropdownValue] = useState<DropdownProps["value"]>();
  const OPTIONS: DropdownProps["options"] = [
    {
      value: "1",
      text: "Toooooooooooooooooo long value",
    },
    {
      value: "2",
      text: "2",
    },
    {
      value: "3",
      text: "3",
    },
    {
      value: "4",
      text: "4",
    },
    {
      value: "5",
      text: "5",
    },
    {
      value: "6",
      text: "6",
    },
    {
      value: "7",
      text: "7",
    },
    {
      value: "8",
      text: "8",
    },
  ];

  const handleValueChange = (value: DropdownProps["value"]): void => {
    setDropdownValue(value);
  };

  return (
    <Stack
      sx={{
        p: "20px",
      }}
    >
      <Dropdown
        mainPlaceholder="Toooooooooooooooo long text"
        options={OPTIONS}
        value={dropdownValue}
        onValueChange={handleValueChange}
        sx={{
          maxWidth: "250px",
        }}
      />
    </Stack>
  );
};
