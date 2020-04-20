# Root

## What is Root?
Root is a cross-platform app built using React Native and Expo, which aims to encourage users to opt for more economically friendly modes of transport to nearby destinations.

On completion of a journey, users will receive points depending on how efficent their journey was. These points can then be converted to money to be donated to a climate support-based charity.


## Setup
To run the app you will need `expo-cli` installed on your machine with the Expo app on a device of your choice.

Clone of download the repo, navigate to the root directory and run `npm install` to install all dependency packages.

Once all packages are installed, run `expo start`

The app can be opened using the QR code


## Issues
Issue | Fix
---|---
react-native-swiper does not support Android devices | react-native-swiper uses the deprecated ViewPagerAndroid. If this error occurs, change all occurences of `ViewPagerAndroid` in `react-native-swiper/src/index.js` module (located in node_modules). [Lines 18, 694 and 704]