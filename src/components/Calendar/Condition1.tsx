import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Condition1 = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#DDDBDA"
      strokeWidth={1.143}
      d="M1 1.143h14.857V16H1z"
    />
  </Svg>
);
export default Condition1;
