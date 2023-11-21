import React from 'react';
import {
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';

// Import RNFetchBlob for the file download
import RNFetchBlob from 'rn-fetch-blob';
import RNFS from 'react-native-fs';

interface checkPermission {
  navigation: any,
  title: any,
  message: any,
  buttonPositive: any
}


const imgAccessPath = (ProductId: any, Name: string) => {
  const { config, fs } = RNFetchBlob;
  return (Platform.OS === 'ios' ? `${fs.dirs.DocumentDir}/image_${ProductId}_${Name}.jpeg` : `file://${fs.dirs.PictureDir}/image_${ProductId}_${Name}.jpeg`)
  // return `file://///storage/emulated/0/Pictures/image_${ProductId}_${Name}.jpeg`
}


const checkPermission = async (ProductId: any, ImageUrl: string, Name: string) => {

  // Function to check the platform
  // If iOS then start downloading
  // If Android then ask for permission

  if (Platform.OS === 'ios') {
    checkImageIsExist(ProductId, ImageUrl, Name);

  } else {
    try {
      // console.log("checkPermission  try")
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'App needs access to your storage to download Photos',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        // console.log('Storage Permission Granted.');
        checkImageIsExist(ProductId, ImageUrl, Name);
      } else {
        // If permission denied then show alert
        // Alert.alert(
        //   'Permission Denied!',
        //   'You need to give storage permission to download the file',
        // );
      }
    } catch (err) {
      // To handle permission related exception
      console.warn(err);
    }
  }
};


const checkImageIsExist = (ProductId: any, ImageUrl: any, Name: string) => {
  RNFS.exists(imgAccessPath(ProductId, Name))
    .then((exists: boolean) => {
      if (exists) {
        //// No need to download Image
      } else {
        downloadImage(ProductId, ImageUrl, Name);
      }
    })
    .catch((error: any) => {
      downloadImage(ProductId, ImageUrl, Name);

    });
}



const downloadImage = async (ProductId: any, ImageUrl: any, Name: string) => {
  // console.log("downloadImage")
  // Main function to download the image
  const destPath = `${Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.CacheDir}/testImage`;
  // To add the time suffix in filename
  let date = new Date();
  // Image URL which we want to download
  let image_URL = ImageUrl;
  // Getting the extention of the file
  let ext: any = getExtention(image_URL);
  ext = '.' + ext;

  // Get config and fs from RNFetchBlob
  // config: To pass the downloading related options
  // fs: Directory path where we want our image to download
  const { config, fs } = RNFetchBlob;
  let PictureDir = `${Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir}`//fs.dirs.PictureDir;
  let path = `${PictureDir + '/image_' + ProductId + '_' + Name + ext}`

  let androidOptions = {
    fileCache: true,
    indicator: true,
    IOSBackgroundTask: true,
    // path: path,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path: path,
      description: 'Image',
    },
  };
  let iosOptions = {
    fileCache: true,
    indicator: true,
    IOSBackgroundTask: true,
    path: path,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      description: 'Image',
    },
  };
  let options = Platform.OS === 'ios' ? iosOptions : androidOptions
  if (Platform.OS === 'ios') {
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Image Downloaded Successfully.');
      });

  } else {
    await RNFetchBlob.config(options).fetch('GET', image_URL);

  }

  //Check if the image was downloaded successfully
  // const exists = await RNFetchBlob.fs.exists(PictureDir);
  // if (exists) {
  //   console.log('Image downloaded and saved successfully:', destPath);
  // } else {
  //   console.error('Failed to download and save image');
  // }

};

const downloadAndSaveImage = async (imageUrl: string, imageName: any) => {
  console.log('downloadAndSaveImage -> ');
  try {
    // Determine the destination path based on the platform
    const destPath = `${Platform.OS === 'ios' ? RNFetchBlob.fs.dirs.DocumentDir : RNFetchBlob.fs.dirs.CacheDir}/${imageName}`;

    await RNFetchBlob.config({
      fileCache: true,
      path: destPath,
    }).fetch('GET', imageUrl);

    // Check if the image was downloaded successfully
    const exists = await RNFetchBlob.fs.exists(destPath);
    if (exists) {
      console.log('Image downloaded and saved successfully:', destPath);
    } else {
      console.error('Failed to download and save image');
    }
  } catch (error) {
    console.error('Error downloading and saving image:', error);
  }
};

const getExtention = (filename: string) => {
  // To get the file extension
  // return /[.]/.exec(filename) ?
  //          /[^.]+$/.exec(filename) : undefined;
  return "jpeg"
};


const handleGetFileList = async () => {

  const path = RNFetchBlob.fs.dirs.DocumentDir + '/' + 'MyApp'

  await RNFetchBlob.fs.isDir(path).then(isDir => {
    console.log('isDir', isDir)
    if (isDir == true) {
      RNFetchBlob.fs.lstat(path).then(filesList => {
        console.log('filesList', filesList)
        // setFiles(filesList)
      })
        .catch(e => {
          console.log('Unable to get files list', e)
        })
    }
  })
    .catch(e => {
      console.log('Error isDir', e)
    })
}


function alert(arg0: string) {
  throw new Error('Function not implemented.');
}



export { checkPermission, downloadImage, imgAccessPath }



