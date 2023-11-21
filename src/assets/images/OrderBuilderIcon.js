import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<Path d="M12.2778 11.8889H3.72222M12.2778 8.77778H3.72222M1 5.66667H15M4.73333 1H11.2667C12.5735 1 13.2269 1 13.726 1.25432C14.165 1.47802 14.522 1.83498 14.7457 2.27402C15 2.77315 15 3.42654 15 4.73333V11.2667C15 12.5735 15 13.2269 14.7457 13.726C14.522 14.165 14.165 14.522 13.726 14.7457C13.2269 15 12.5735 15 11.2667 15H4.73333C3.42654 15 2.77315 15 2.27402 14.7457C1.83498 14.522 1.47802 14.165 1.25432 13.726C1 13.2269 1 12.5735 1 11.2667V4.73333C1 3.42654 1 2.77315 1.25432 2.27402C1.47802 1.83498 1.83498 1.47802 2.27402 1.25432C2.77315 1 3.42654 1 4.73333 1Z" stroke={props.color ? props.color:"black"} stroke-linecap="round" stroke-linejoin="round"/>
</Svg>

    
    
  );
}

export default SvgComponent;