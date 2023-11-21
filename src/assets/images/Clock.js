import React from "react";
import Svg, { Path } from "react-native-svg";
function SvgComponent(props) {

  return (
    <Svg width={props?.width ? props.width :"14"} height={props?.height?props.height :"14"} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M7 3.40088V7.00088L9.4 8.20088" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  );
}

export default SvgComponent;