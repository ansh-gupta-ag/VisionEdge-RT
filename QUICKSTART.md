# Quick Start Guide

Get your project running in 3 steps:

## Step 1: Download OpenCV (5 minutes)

1. Visit https://opencv.org/releases/
2. Download **OpenCV 4.8.0 Android SDK** (or latest)
3. Extract and copy the `sdk` folder to your project:
   ```
   your-project/
     opencv/
       sdk/
   ```

## Step 2: Build Android App (2 minutes)

```bash
# Open in Android Studio
# File → Open → Select project folder
# Wait for Gradle sync

# Or build from command line:
./gradlew assembleDebug
```

## Step 3: Run on Device (1 minute)

```bash
# Connect Android device via USB
# Enable USB debugging in Developer Options

adb install -r app/build/outputs/apk/debug/app-debug.apk

# Or click Run ▶️ in Android Studio
```

## Bonus: Web Viewer (2 minutes)

```bash
cd web
npm install
npm start

# Open http://localhost:3000
```

## What You'll See

- **Android App**: Real-time camera with 3 modes
  - RAW: Original camera feed
  - GRAYSCALE: Black and white
  - EDGES: Canny edge detection
  
- **Web Viewer**: Sample processed frame with stats

## Troubleshooting

**OpenCV not found?**
- Check `opencv/sdk/native/jni` exists
- Verify path in `app/CMakeLists.txt`

**NDK errors?**
- Install NDK via Android Studio SDK Manager
- Tools → SDK Manager → SDK Tools → NDK

**Camera permission denied?**
- Grant permission in device settings
- Or reinstall app

**Low FPS?**
- Use physical device (not emulator)
- Reduce resolution in CameraManager.kt

## Next Steps

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system
2. Follow [GIT_COMMIT_PLAN.md](GIT_COMMIT_PLAN.md) for commits
3. Use [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) before submission
4. Check [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for details

## Project Structure

```
/app          - Android Kotlin code + native C++
/web          - TypeScript web viewer
/opencv       - OpenCV SDK (you download this)
README.md     - Main documentation
```

## Key Files

- `app/src/main/cpp/native-lib.cpp` - OpenCV processing
- `app/src/main/java/.../MainActivity.kt` - Main app
- `app/src/main/java/.../CameraManager.kt` - Camera2 API
- `web/src/main.ts` - Web viewer logic

## Support

Check logs:
```bash
adb logcat | grep -i edgeviewer
```

That's it! You're ready to build. 🚀
