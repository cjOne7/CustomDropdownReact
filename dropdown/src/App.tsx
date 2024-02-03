import { Stack } from "@mui/material";
import { ReactElement, useState } from "react";

import { SocialLinksWrapper } from "./components/SocialLinksWrapper.tsx";
import { Dropdown, DropdownProps } from "./dropdown/Dropdown.tsx";
import { SocialIcons } from "./models/iconsEnums.ts";

export const App = (): ReactElement => {
  const [dropdownValue, setDropdownValue] = useState<DropdownProps["value"]>();
  const OPTIONS: DropdownProps["options"] = [
    {
      value: SocialIcons.YOUTUBE,
      text: "Youtube",
      icon: <SocialLinksWrapper type={SocialIcons.YOUTUBE} />,
    },
    {
      value: SocialIcons.TELEGRAM,
      text: "Telegram",
      icon: <SocialLinksWrapper type={SocialIcons.TELEGRAM} />,
    },
    {
      value: SocialIcons.REDDIT,
      text: "Reddit",
      icon: <SocialLinksWrapper type={SocialIcons.REDDIT} />,
    },
    {
      value: SocialIcons.FACEBOOK,
      text: "Facebook",
      icon: <SocialLinksWrapper type={SocialIcons.FACEBOOK} />,
    },
    {
      value: SocialIcons.WHATSAPP,
      text: "Whatsapp",
      icon: <SocialLinksWrapper type={SocialIcons.WHATSAPP} />,
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
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus dignissimos ex illo, quas
        quasi quisquam rem veritatis. Aliquid dignissimos dolore ducimus fugit inventore natus,
        optio quo rem repellendus sed unde!
      </p>
      <p>
        Consectetur delectus doloremque esse excepturi laboriosam saepe velit! Asperiores
        consectetur cum harum modi nobis quasi qui repellendus vel? Explicabo nisi repudiandae
        veniam! Adipisci architecto doloremque, eligendi eum iste magni repellendus.
      </p>
      <Dropdown
        mainPlaceholder="Very many social links!!!"
        options={OPTIONS}
        value={dropdownValue}
        onValueChange={handleValueChange}
        sx={{
          maxWidth: "250px",
        }}
      />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, amet animi blanditiis
        dignissimos enim fugiat hic ipsam iure magnam maiores nobis perspiciatis, provident quisquam
        repudiandae rerum sint sit temporibus tenetur.
      </p>
    </Stack>
  );
};
