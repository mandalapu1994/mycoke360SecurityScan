
import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M4 7H16M1 1H19M7 13H13" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

export default SvgComponent;