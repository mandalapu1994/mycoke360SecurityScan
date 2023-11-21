import * as React from "react";
import Svg, { SvgProps, G, Rect, Path, Defs, ClipPath } from "react-native-svg";
const PlayButton = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Rect width={40} height={40} fill="#fff" rx={20} />
      <Path
        fill="#000"
        d="M27.613 19.777c.172.099.172.347 0 .446l-11.226 6.482A.258.258 0 0 1 16 26.48V13.52c0-.199.215-.323.387-.224l11.226 6.482Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h40v40H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default PlayButton;
