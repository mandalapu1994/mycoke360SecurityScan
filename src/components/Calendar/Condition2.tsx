import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Condition2 = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#DDDBDA"
      strokeWidth={1.143}
      d="M.571.571h14.857v14.857H.571z"
    />
    <Path
      fill="#F40000"
      d="m7.109 10.61.122-1.884-1.578 1.056L5 8.633l1.7-.828L5 6.977l.653-1.15L7.23 6.886 7.109 5h1.31l-.127 1.885L9.87 5.828l.653 1.15-1.695.827 1.695.828-.653 1.15-1.578-1.057.127 1.884h-1.31Z"
    />
  </Svg>
);
export default Condition2;
