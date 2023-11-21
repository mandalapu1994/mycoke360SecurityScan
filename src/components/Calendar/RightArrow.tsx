import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const RightArrow = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M4.923 15.7V3.252c0-.352.457-.598.774-.317l7.455 6.084a.563.563 0 0 1 0 .879l-7.455 6.154c-.317.246-.774.035-.774-.352Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default RightArrow;
