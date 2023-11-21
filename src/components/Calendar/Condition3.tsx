import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Condition3 = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)" filter="url(#b)">
      <G clipPath="url(#c)">
        <Path fill="#EAEAEA" d="M0 0h16v16H0z" />
        <Path
          stroke="#B3B3B3"
          strokeWidth={0.457}
          d="m4.162.003-4.4 4.4M9.762.162l-10 10M15.761.561.162 16.161M16.162 6.561l-9.2 9.2M16.162 11.762l-4 4"
        />
      </G>
      <Path
        stroke="#DDDBDA"
        strokeWidth={1.143}
        d="M.571.571h14.857v14.857H.571z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
      <ClipPath id="c">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Condition3;
