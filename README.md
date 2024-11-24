# Welcome to STRAVA app 👋

This is an [Expo](https://expo.dev) project created with `npx create-expo-app@latest`

## Get started

1. Clone repo

   ```bash
   git clone https://github.com/npminit-dev/strava_app.git
   cd strava_app
   ```


2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Some doubts

  I can only test the application with my Google account, that is, to use the Strava API I must create an application (with my account) and there I am provided with the ClientID and the Secret, but I cannot enter the application with another account from Google (I get a 403 error: the limit of connected athletes has been exceeded). I wonder how they will test the app. You can change the ClientID and Sectret in the constants/URL.ts file and maybe then you can log in to the application with another account.

## Design decisions

- Despite not being familiar with Strava or its API, I have read its documentation carefully to familiarize myself with its authentication and authorization flow, and with the endpoints to obtain its data.
- I decided to use Zustand and expo-secure-store to save and manage authentication and authorization data.
- I decided to use TanStackQuery to obtain and cache the activity data, either all of them or they meet a time range (3 months), the activities of each month are passed to a screen via url params.
- I have chosen a middleware strategy to keep the tokens fresh on each new request if the access token has expired.
## Areas that could be improved with more time
- Security: The ClientID and ClientSecret are not stored in safe places... I have done it for simplicity and lack of time but I understand that it should not be done. They must be saved in expo-secure-store.
- UX/UI: The interface is simple and not based on some elegant design, it can be improved
- Some components can be extracted from other more complex ones.
- Some processes can be optimized
- And many others that I'm sure I'm forgetting


And that's all, I await your feedback 🤠
