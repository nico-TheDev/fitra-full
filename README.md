# Fitra

Fitra is a cross-platform personal finance app built with [Expo](https://expo.dev/) and React Native. It helps you track accounts, categorize spending and income, view charts, and manage transfers—backed by [Firebase](https://firebase.google.com/) (Authentication, Firestore, and Storage).

## Features

- **Dashboard** — Recent activity and category breakdowns  
- **Accounts** — Multiple accounts, transfers, and history  
- **Categories** — Custom categories with icons and colors  
- **Transactions** — Add, edit, and inspect transactions (including photos via image picker)  
- **Charts** — Visual summaries of your finances  
- **Auth** — Onboarding, login, and registration  

## Tech stack

| Area | Libraries |
|------|-----------|
| UI | React Native 0.70, Expo SDK 47, styled-components |
| Navigation | React Navigation (native stack, bottom tabs) |
| State | Redux Toolkit, Zustand, React Context (auth, theme) |
| Backend | Firebase Auth, Firestore, Cloud Storage |
| Data / forms | SWR, Formik, Axios |
| Charts | react-native-chart-kit |

The app uses [Expo Dev Client](https://docs.expo.dev/develop/development-builds/introduction/) (`expo start --dev-client`), so you run it with a custom development build rather than Expo Go alone when native modules require it.

## Prerequisites

- **Node.js** (LTS recommended) and npm  
- **Expo account** (for EAS updates / builds already configured in `app.json`)  
- **Firebase project** with Authentication, Firestore, and Storage enabled  
- For local **iOS** builds: Xcode and CocoaPods (macOS)  
- For local **Android** builds: Android Studio and an SDK / emulator or device  

## Getting started

1. **Clone the repository and install dependencies**

   ```bash
   cd fitra-full
   npm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root (it is gitignored). Babel loads it via `react-native-dotenv` into `@env`. Use the variable names expected in `firebase.config.js`:

   ```env
   REACT_APP_API_KEY=
   REACT_APP_AUTH_DOMAIN=
   REACT_APP_PROJECT_ID=
   REACT_APP_STORAGE_BUCKET=
   REACT_APP_MESSAGING_SENDER_ID=
   REACT_APP_APP_ID=
   REACT_APP_MEASUREMENT_ID=
   ```

   Copy the values from your Firebase project’s web app configuration (Firebase Console → Project settings → Your apps). `REACT_APP_MEASUREMENT_ID` is optional unless you enable Analytics in code.

3. **Start the Metro bundler**

   ```bash
   npm start
   ```

   This runs `expo start --dev-client`. Open the app in your **development build** on a simulator or device.

4. **Run on a platform** (after native projects exist or via EAS)

   ```bash
   npm run ios
   npm run android
   npm run web
   ```

   If `ios/` and `android/` folders are not present, generate them with `npx expo prebuild` when you are ready for local native builds, or use [EAS Build](https://docs.expo.dev/build/introduction/) (see below).

## EAS Build

`eas.json` defines three profiles:

- **development** — development client, internal distribution  
- **preview** — internal distribution  
- **production** — store-ready builds  

Builds and credentials are tied to the Expo project ID in `app.json` under `extra.eas.projectId`. Run builds with the [EAS CLI](https://docs.expo.dev/build/setup/) after logging in (`eas login`).

## Project layout

| Path | Role |
|------|------|
| `App.js` | Entry: fonts, splash, auth & theme providers |
| `components/` | Screens, navigators, and shared UI |
| `contexts/` | React context (e.g. auth, theme) |
| `hooks/` | Data listeners, stores, and hooks |
| `constants/`, `data/`, `util/` | Shared constants, seed data, helpers |
| `assets/` | Fonts, images, icons |
| `firebase.config.js` | Firebase initialization |

Imports such as `fitra/contexts/...` resolve through the package name defined in `package.json` (`"name": "fitra"`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start Expo with dev client |
| `npm run ios` | Run on iOS |
| `npm run android` | Run on Android |
| `npm run web` | Run in the browser |

## License

Private project (`private: true` in `package.json`).
