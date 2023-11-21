import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
const CalendarIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.2 10.4H4.8M15.2 4v3.2M8.8 4v3.2M8.64 20h6.72c1.344 0 2.016 0 2.53-.262a2.4 2.4 0 0 0 1.048-1.048c.262-.514.262-1.186.262-2.53V9.44c0-1.344 0-2.016-.262-2.53a2.4 2.4 0 0 0-1.048-1.048c-.514-.262-1.186-.262-2.53-.262H8.64c-1.344 0-2.016 0-2.53.262A2.4 2.4 0 0 0 5.062 6.91C4.8 7.424 4.8 8.096 4.8 9.44v6.72c0 1.344 0 2.016.262 2.53a2.4 2.4 0 0 0 1.048 1.048C6.624 20 7.296 20 8.64 20Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CalendarIcon;
