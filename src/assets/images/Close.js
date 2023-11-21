import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M13 1.5L1 13.5" stroke="#7D8B96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <Path d="M1 1.5L13 13.5" stroke="#7D8B96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}

export default SvgComponent;
