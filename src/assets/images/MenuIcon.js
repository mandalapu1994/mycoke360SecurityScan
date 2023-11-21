import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="24" height="16" viewBox="0 0 24 16" fill="none" >
    <Path d="M1.5 8H22.5M1.5 1H22.5M1.5 15H22.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
    
  );
}

export default SvgComponent;