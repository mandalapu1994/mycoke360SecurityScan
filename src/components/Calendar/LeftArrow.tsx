import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const LeftArrow = (props: SvgProps) => (
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
      d="M13.363 3.27V15.72c0 .352-.457.598-.774.316L5.134 9.952a.563.563 0 0 1 0-.88L12.59 2.92c.316-.246.774-.035.774.352Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default LeftArrow;
