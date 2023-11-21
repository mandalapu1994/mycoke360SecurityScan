import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Rect,
  Defs,
  Pattern,
  Use,
  Image,
  ClipPath,
  Path,
} from "react-native-svg";
const BannerRedTShirtLady = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={300}
    height={300}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Rect width={300} height={300} fill="url(#b)" rx={150} />
      <Rect width={300} height={300} fill="url(#c)" rx={150} />
    </G>
    <Defs>
      <Pattern
        id="b"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#d" transform="matrix(.00146 0 0 .00146 0 -.25)" />
      </Pattern>
      <Pattern
        id="c"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#e" transform="translate(-.739) scale(.00129)" />
      </Pattern>
      <Image
        id="d"
        width={687}
        height={1031}
      />
      <Image
        id="e"
        width={1920}
        height={775}
      />
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h300v300H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default BannerRedTShirtLady;