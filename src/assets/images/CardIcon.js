import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M21 6H1M1 4.2L1 11.8C1 12.9201 1 13.4802 1.21799 13.908C1.40973 14.2843 1.71569 14.5903 2.09202 14.782C2.51984 15 3.07989 15 4.2 15L17.8 15C18.9201 15 19.4802 15 19.908 14.782C20.2843 14.5903 20.5903 14.2843 20.782 13.908C21 13.4802 21 12.9201 21 11.8V4.2C21 3.0799 21 2.51984 20.782 2.09202C20.5903 1.7157 20.2843 1.40974 19.908 1.21799C19.4802 1 18.9201 1 17.8 1L4.2 1C3.0799 1 2.51984 1 2.09202 1.21799C1.7157 1.40973 1.40973 1.71569 1.21799 2.09202C1 2.51984 1 3.07989 1 4.2Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

export default SvgComponent;