import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
        <Path d="M9.22083 17.5C13.6391 17.5 17.2208 13.9183 17.2208 9.5C17.2208 5.08172 13.6391 1.5 9.22083 1.5C4.80255 1.5 1.22083 5.08172 1.22083 9.5C1.22083 13.9183 4.80255 17.5 9.22083 17.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M19.2208 19.5L14.8708 15.15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
  );
}

export default SvgComponent;