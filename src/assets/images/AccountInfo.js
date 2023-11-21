import React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3.00002 20.8174C3.6026 21 4.41649 21 5.8 21H16.2C17.5835 21 18.3974 21 19 20.8174M3.00002 20.8174C2.87082 20.7783 2.75133 20.7308 2.63803 20.673C2.07354 20.3854 1.6146 19.9265 1.32698 19.362C1 18.7202 1 17.8802 1 16.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H16.2C17.8802 1 18.7202 1 19.362 1.32698C19.9265 1.6146 20.3854 2.07354 20.673 2.63803C21 3.27976 21 4.11984 21 5.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C19.2487 20.7308 19.1292 20.7783 19 20.8174M3.00002 20.8174C3.00035 20.0081 3.00521 19.5799 3.07686 19.2196C3.39249 17.6329 4.63288 16.3925 6.21964 16.0769C6.60603 16 7.07069 16 8 16H14C14.9293 16 15.394 16 15.7804 16.0769C17.3671 16.3925 18.6075 17.6329 18.9231 19.2196C18.9948 19.5799 18.9996 20.0081 19 20.8174M15 8.5C15 10.7091 13.2091 12.5 11 12.5C8.79086 12.5 7 10.7091 7 8.5C7 6.29086 8.79086 4.5 11 4.5C13.2091 4.5 15 6.29086 15 8.5Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>

    );
}

export default SvgComponent;