import { Dimensions,Platform,PixelRatio } from 'react-native';

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  } = Dimensions.get("window")
  
const scale = SCREEN_WIDTH / 375
  
  //For responsive Font
export const responsiveFont =(size: number): number => {
    const newSize = size * scale 
    if(Platform.OS == "ios" ) {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }
    else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
    }
}


// For responsive images 
export const responsiveImage = (size: number): number => {
  const newSize = size * scale 
  if(Platform.OS == "ios" ) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
  }
}

//For responsive Spacing
export const responsiveSpacing = (size: number): number => {
  const newSize = size * scale 
  if(Platform.OS == "ios" ) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  }
  else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 5
  }
}



