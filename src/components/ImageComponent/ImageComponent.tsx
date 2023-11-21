import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

interface ImageComponentProps{
    productsImages?: any, 
    style: any,
     url?: any 
}

const ImageComponent: React.FC<ImageComponentProps> = ({ productsImages, style, url }) => {
   
    const [imgerror, setImgError] = useState<Boolean>(false)
    const handleImageError = () => {
        setImgError(true);
    }
    useEffect(() => {
    }, [productsImages, url])



    return <>
        {productsImages != undefined ? (imgerror ?
            <Image
                source={require("../../assets/images/CocaCola.png")}
                style={style}
            />
            :
            <Image
                // Replace with your image URL
                source={{ uri: `file://${productsImages}` }}
                style={style}
                onError={handleImageError}
            />)
            :
            (

                url != undefined ? (imgerror ?
                    <Image
                        source={require("../../assets/images/CocaCola.png")}
                        style={style}
                    />
                    :
                    <Image
                        // Replace with your image URL
                        source={url}
                        style={style}
                        onError={handleImageError}
                    />)
                    :
                    <Image
                        source={require("../../assets/images/CocaCola.png")}
                        style={style}
                    />
            )


        }


    </>

}

export default ImageComponent