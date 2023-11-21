import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" >
<Path d="M14.4286 8L5.85713 8M14.4286 3.71429L5.85713 3.71429M14.4286 12.2857L5.85713 12.2857M2.99998 8C2.99998 8.39449 2.68019 8.71429 2.2857 8.71429C1.89121 8.71429 1.57141 8.39449 1.57141 8C1.57141 7.60551 1.89121 7.28571 2.2857 7.28571C2.68019 7.28571 2.99998 7.60551 2.99998 8ZM2.99998 3.71429C2.99998 4.10877 2.68019 4.42857 2.2857 4.42857C1.89121 4.42857 1.57141 4.10877 1.57141 3.71429C1.57141 3.3198 1.89121 3 2.2857 3C2.68019 3 2.99998 3.3198 2.99998 3.71429ZM2.99998 12.2857C2.99998 12.6802 2.68019 13 2.2857 13C1.89121 13 1.57141 12.6802 1.57141 12.2857C1.57141 11.8912 1.89121 11.5714 2.2857 11.5714C2.68019 11.5714 2.99998 11.8912 2.99998 12.2857Z"  stroke={props.color ? props.color:"black"} stroke-linecap="round" stroke-linejoin="round" />
</Svg>



    
    
  );
}

export default SvgComponent;