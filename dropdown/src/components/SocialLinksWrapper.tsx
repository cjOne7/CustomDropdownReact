import { useTheme } from "@mui/material";
import React, { CSSProperties, ReactElement } from "react";

import FacebookSvg from "../assets/social-links/facebook.svg?react";
import LinkedInSvg from "../assets/social-links/linkedin.svg?react";
import RedditSvg from "../assets/social-links/reddit.svg?react";
import TelegramSvg from "../assets/social-links/telegram.svg?react";
import TiktokSvg from "../assets/social-links/tiktok.svg?react";
import TwitchSvg from "../assets/social-links/twitch.svg?react";
import WhatsappSvg from "../assets/social-links/whatsapp.svg?react";
import YoutubeSvg from "../assets/social-links/youtube.svg?react";
import { SocialIcons } from "../models/iconsEnums.ts";

interface SocialLinksWrapperProps {
  type: SocialIcons;
  iconWidth?: CSSProperties["width"];
  iconHeight?: CSSProperties["height"];
}

export const SocialLinksWrapper = (props: SocialLinksWrapperProps): ReactElement => {
  const DEFAULT_ICON_SIZE = 20;
  const { type, iconWidth = DEFAULT_ICON_SIZE, iconHeight } = props;
  const theme = useTheme();
  const { pxToRem } = theme.typography;

  const socialLinksMapper = new Map<SocialIcons, ReactElement>([
    [SocialIcons.FACEBOOK, <FacebookSvg key={SocialIcons.FACEBOOK} />],
    [SocialIcons.TELEGRAM, <TelegramSvg key={SocialIcons.TELEGRAM} />],
    [SocialIcons.REDDIT, <RedditSvg key={SocialIcons.REDDIT} />],
    [SocialIcons.YOUTUBE, <YoutubeSvg key={SocialIcons.YOUTUBE} />],
    [SocialIcons.WHATSAPP, <WhatsappSvg key={SocialIcons.WHATSAPP} />],
    [SocialIcons.TIKTOK, <TiktokSvg key={SocialIcons.TIKTOK} />],
    [SocialIcons.LINKEDIN, <LinkedInSvg key={SocialIcons.LINKEDIN} />],
    [SocialIcons.TWITCH, <TwitchSvg key={SocialIcons.TWITCH} />],
  ]);

  const pxToRemTypeConverter = (value?: string | number): string | undefined => {
    if (typeof value === "string") {
      return value;
    } else if (typeof value === "number") {
      return pxToRem(value);
    }
    return value;
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return React.cloneElement(socialLinksMapper.get(type)!, {
    style: {
      minWidth: pxToRemTypeConverter(iconWidth),
      minHeight: pxToRemTypeConverter(iconHeight ?? iconWidth),
      width: pxToRemTypeConverter(iconWidth),
      height: pxToRemTypeConverter(iconHeight ?? iconWidth),
    },
  });
};
