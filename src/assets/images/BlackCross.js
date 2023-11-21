import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="20" height="20" viewBox="0 0 16 16" fill="none" >
    <Path d="M15 1L1 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <Path d="M1 1L15 15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    



    
    
  );
}

export default SvgComponent;