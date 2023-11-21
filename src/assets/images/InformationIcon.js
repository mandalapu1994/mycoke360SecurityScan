import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent({width,height}) {
    return (
        <Svg width={width?width:"18"} height={height?height:"18"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M9 12.2V9M9 5.8H9.008M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

export default SvgComponent;