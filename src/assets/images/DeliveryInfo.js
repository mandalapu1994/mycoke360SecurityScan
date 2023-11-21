import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
    return (
        <Svg width="22" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M8.68089 18.9442H3.12549V11.625" stroke="black" />
            <Path d="M3.26123 1H22.4022V18.9444H18.5289L15.8444 13.2918L18.4162 13.9717C18.4162 13.9717 20.0168 14.197 20.3315 12.6392" stroke="black" stroke-linecap="round" />
            <Path d="M11.1631 18.731L11.7808 20.3354C11.7808 20.3354 12.1848 21.431 13.3192 20.8094L14.0651 20.3743" stroke="black" stroke-linecap="round" />
            <Path d="M6.60596 13.7271L9.50799 20.3314C9.50799 20.3314 9.9703 21.3842 10.9687 20.8053L11.6758 20.4246" stroke="black" />
            <Path d="M13.1367 17.8218L14.1623 20.3081C14.1623 20.3081 14.5392 21.427 15.592 20.7549L16.4272 20.2382" stroke="black" stroke-linecap="round" />
            <Path d="M15.0674 16.9829L16.4426 20.0403C16.4426 20.0403 16.8195 21.0271 17.6392 20.491" stroke="black" stroke-linecap="round" />
            <Path d="M11.2441 9.16992L14.7911 9.67497L20.3465 12.6469" stroke="black" stroke-linejoin="round" />
            <Path d="M14.3949 1.09326V4.5314H11.0771V1.09326" stroke="black" />
            <Path d="M15.4287 12.4526L16.128 13.8939" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M3.27268 1.00781L10.3898 7.28969L4.77614 13.0083L1 9.62841" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    );
}

export default SvgComponent;