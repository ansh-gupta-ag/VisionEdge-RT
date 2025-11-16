# Real-Time Edge Detection Viewer

Android app with OpenCV C++ processing, OpenGL ES rendering, and TypeScript web viewer.

## Tech Stack
- **Android**: Kotlin, Camera2 API, TextureView
- **Native**: C++17, OpenCV 4.x, JNI
- **Graphics**: OpenGL ES 2.0
- **Web**: TypeScript, HTML5

## Architecture Flow
```
Camera → Kotlin → JNI → C++ (OpenCV) → OpenGL Texture → Screen
```

## Features
- [x] Real-time camera feed
- [x] JNI bridge to native C++
- [x] OpenCV processing (Grayscale + Canny edge detection)
- [x] OpenGL ES 2.0 rendering
- [x] TypeScript web viewer
- [x] FPS counter

## Project Structure
```
/app          - Android application (Kotlin/Java)
/jni          - C++ OpenCV processing
/gl           - OpenGL ES renderer classes
/web          - TypeScript web viewer
```

## Build Instructions

### Prerequisites
- Android Studio (latest stable)
- NDK r23b or newer
- CMake 3.10+
- OpenCV Android SDK 4.x
- Node.js 18+ (for web viewer)

### Setup
1. Clone the repository
2. Download OpenCV Android SDK and extract to `opencv/`
3. Open project in Android Studio
4. Sync Gradle
5. Build and run on device

### Build Commands
```bash
./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

### Web Viewer
```bash
cd web
npm install
npm run build
npm start
```

## Performance
- Target: 15+ FPS
- Resolution: 640x480 or 720p
- Processing: Canny edge detection with configurable thresholds

## License
MIT
