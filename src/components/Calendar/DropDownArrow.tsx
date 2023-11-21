import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const DropDownArrow = (props: SvgProps) => (
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
      d="M3.247 4.923h11.81c.333 0 .566.457.3.774l-5.772 7.455a.518.518 0 0 1-.834 0L2.913 5.697c-.233-.317-.033-.774.334-.774Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default DropDownArrow;
