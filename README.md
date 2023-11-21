# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

<!-- # Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references -->

<!-- Steps for Prerequisites and code run in brief -->
<!-- # Prerequisites

# Android : -

1. Need to install node: https://nodejs.org/en/download
2. Need to install Java Development Kit (JDK) : https://www.oracle.com/in/java/technologies/downloads/
3. Need to install Android Studio : https://developer.android.com/studio
4. Need to install code editor in case of editing code : https://code.visualstudio.com/download
5. Install nvm in the system as per the OS : 
    Windows: https://www.geeksforgeeks.org/how-to-install-and-use-nvm-on-windows/
    macOS: https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os/
    Ubuntu: https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/
4. Need to do android development setup by following the steps provided in this link : https://reactnative.dev/docs/environment-setup?guide=native

# IOS : -

1. Need to have macOS Operating system
2. Need to install xcode from app store.
3. Need to install node: https://nodejs.org/en/download
4. Need to install code editor in case of editing code : https://code.visualstudio.com/download
5. Install nvm in the system as per the OS : 
    Windows: https://www.geeksforgeeks.org/how-to-install-and-use-nvm-on-windows/
    macOS: https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os/
    Ubuntu: https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/
6. Need to do IOS development setup by following the steps provided in this link : https://reactnative.dev/docs/  environment-setup?guide=native&os=macos&platform=ios

# Project Setup and Project running

# Android:- 

1. Login to Azure and select the project named myCoke360Mobile under Projects section.
2. Click on the Repos option from the menu available in left hand side.
3. Select main branch from the branch dropdown and click on the clone button visble on the right hand side.
4. One click on Clone button a modal will be shown and we will click on "Generate Git Credentials" and copy username and password
5. Open the terminal in the location where you iwsh to clone the project and use command
   "git clone https://CokeOneNA@dev.azure.com/CokeOneNA/myCoke360Mobile/_git/myCoke360Mobile"
6. It will ask for username and password which we have already copied.
7. Once clone is done, We will navigate to project by using the command "cd myCoke360Mobile"
8. we will check branch with the following command : git branch
9. Change the branch where the updated code is available by following command : git checkout <branch name> 
10. Install nvm 18.13.0 version by using the following command : nvm install 18.13.0
11. Switch to nvm version downloaded by using the following command : nvm use 18.13.0
12. Install node modules of project by using the following command : npm install
13. To run the project, use the following command : npx react-native start 
14. Open another terminal and locate to same location and run command : npx react-native run-android -->


##### ANDROID STEPS

### Prerequisites

- install node: https://nodejs.org/en/download
- install Java Development Kit (JDK): https://www.oracle.com/in/java/technologies/downloads/
- install code editor in case of editing code: https://code.visualstudio.com/downloadz
- Android devlopment setup: https://reactnative.dev/docs/environment-setup?guide=native

### Install dependencies

- `nvm install 18.13.0`
- `nvm use 18.13.0`
- `npm install`

### Run Android build

<!-- Useboth commands in different terminal but location must be in root folder -->
- `npx react-native start`
- `npx react-native run-android`

### Create APK Build

- `cd android && ./gradlew clean`
- `./gradlew assembleRelease`

##### IOS STEPS

### Prerequisites

- `brew install yarn`
- `brew install node`
- `sudo gem install cocoapods`
- `brew install watchman`
- `yarn global add react-native-cli`

### Install dependencies

- `yarn install`
- `yarn run pods`

### Run IOS build

- `react-native run-ios`

### Create IOS build

- `react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios`

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:
- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)