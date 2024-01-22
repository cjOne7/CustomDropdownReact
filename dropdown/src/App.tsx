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
  ];

  const handleValueChange = (value: DropdownProps["value"]): void => {
    setDropdownValue(value);
  };

  return (
    <Dropdown
      mainPlaceholder="Toooojjjjjjjjjjjjjjaaaaaa long text"
      options={OPTIONS}
      value={dropdownValue}
      onValueChange={handleValueChange}
      sx={{
        maxWidth: "250px",
      }}
    />
  );
};
