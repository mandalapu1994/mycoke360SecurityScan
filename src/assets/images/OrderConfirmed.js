import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
    return (
        <Svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M14.75 26L22.25 33.5L37.25 18.5M51 26C51 39.8071 39.8071 51 26 51C12.1929 51 1 39.8071 1 26C1 12.1929 12.1929 1 26 1C39.8071 1 51 12.1929 51 26Z" stroke="#0C8359" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
}

export default SvgComponent;