import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="10" height="10" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M1 1H9" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

export default SvgComponent;