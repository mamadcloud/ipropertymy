# Assessment for Mobile iProperty.com

## About
This mobile app is containing 4 pages:
1. Home Page
2. Search Page
3. Listing Detail Page
4. Shortlisted Page

This app implement `react hooks` and `react context`, and use `functional component` approach.
It is using `AsyncStorage` to store the bookmark data locally and calling `GraphQL` to call search result data.

## How to start
Requirements:
1. `node` >= v12.1
2. `react-native`
3. `cocoapods`
4. `npx`

Follow this instruction to run the application
1. `npm install` or `yarn install`
2. `cd ios`
3. `pod install`
4. `cd ..`
5. `npx react-native run-ios` to run iOS
6. `npx react-native run-android` to run Android

## Screenshots
1. Home Page

<img src="./docs/home.png" alt="drawing" width="300"/>

2. Search Page

<img src="./docs/search.png" alt="drawing" width="300"/>

3. Detail Page

<img src="./docs/detail.png" alt="drawing" width="300"/>

4. Shortlisted Page

<img src="./docs/shortlist.png" alt="drawing" width="300"/>

More on [here](./docs)

## Fastlane
Requirements
1. Make sure install `firebase cli`
2. Login to your account
3. Make sure you have created the project and apps for both platform (iOS and Android)
3. Go to respective platform folder in the project and change the App ID to your project ID.


To upload to Firebase
1. iOS
- Make sure you are inside `ios` folder
- Run `fastlane ios firebase`

2. Android
- Make sure you are inside `android` folder
- Run `fastlane android firebase`