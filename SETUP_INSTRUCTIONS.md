# Setup Instructions

## Step 1: Download OpenCV Android SDK

1. Go to https://opencv.org/releases/
2. Download OpenCV 4.8.0 (or latest) Android SDK
3. Extract the zip file
4. Copy the `sdk` folder to `opencv/sdk` in your project root

Your structure should look like:
```
project-root/
  opencv/
    sdk/
      native/
        jni/
      java/
```

## Step 2: Open in Android Studio

1. Open Android Studio
2. File → Open → Select this project folder
3. Wait for Gradle sync to complete
4. If prompted, install NDK and CMake via SDK Manager

## Step 3: Build the App

```bash
./gradlew assembleDebug
```

## Step 4: Run on Device

1. Enable Developer Options on your Android device
2. Enable USB Debugging
3. Connect device via USB
4. Click Run in Android Studio (or use adb install)

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Step 5: Setup Web Viewer

```bash
cd web
npm install
npm run build
npm start
```

Open http://localhost:3000 in your browser

## Troubleshooting

### OpenCV not found
- Verify opencv/sdk path exists
- Check CMakeLists.txt OpenCV_DIR path

### NDK errors
- Install NDK r23b or newer via SDK Manager
- Verify ndk.dir in local.properties

### Camera permission denied
- Grant camera permission in device settings
- Reinstall app

## Git Setup

```bash
git init
git add .
git commit -m "init: project scaffold"
```

Make small commits as you progress:
- feat(camera): add Camera2 preview
- feat(native): implement OpenCV processing
- feat(opengl): add texture rendering
- docs: update README with screenshots
