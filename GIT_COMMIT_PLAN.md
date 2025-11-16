# Git Commit Strategy

Follow this commit plan for clean, professional Git history:

## Initial Setup
```bash
git init
git add .gitignore README.md
git commit -m "init: add gitignore and readme"

git add gradle.properties settings.gradle build.gradle
git commit -m "init: add gradle configuration"

git add app/build.gradle app/proguard-rules.pro
git commit -m "init: add app module configuration"
```

## Android Structure
```bash
git add app/src/main/AndroidManifest.xml
git add app/src/main/res/
git commit -m "feat(android): add manifest and resources"

git add app/CMakeLists.txt
git commit -m "feat(native): add CMake configuration"
```

## Camera Implementation
```bash
git add app/src/main/java/com/example/edgeviewer/CameraManager.kt
git commit -m "feat(camera): implement Camera2 API with ImageReader"

git add app/src/main/res/layout/activity_main.xml
git commit -m "feat(ui): add main activity layout with TextureView"
```

## JNI Bridge
```bash
git add app/src/main/java/com/example/edgeviewer/NativeBridge.kt
git commit -m "feat(jni): add native bridge interface"
```

## Native Processing
```bash
git add app/src/main/cpp/native-lib.cpp
git commit -m "feat(opencv): implement YUV conversion and grayscale"

git add app/src/main/cpp/native-lib.cpp
git commit -m "feat(opencv): add Canny edge detection"
```

## OpenGL Rendering
```bash
git add app/src/main/java/com/example/edgeviewer/GLRenderer.kt
git commit -m "feat(opengl): implement texture rendering with GLES2"
```

## Main Activity
```bash
git add app/src/main/java/com/example/edgeviewer/MainActivity.kt
git commit -m "feat(app): integrate camera, processing, and rendering"

git add app/src/main/java/com/example/edgeviewer/MainActivity.kt
git commit -m "feat(ui): add FPS counter and mode toggle"
```

## Web Viewer
```bash
git add web/package.json web/tsconfig.json
git commit -m "feat(web): add TypeScript configuration"

git add web/src/main.ts web/src/server.ts
git commit -m "feat(web): implement frame viewer with stats"

git add web/public/index.html
git commit -m "feat(web): add HTML interface with styling"
```

## Documentation
```bash
git add README.md
git commit -m "docs: update README with architecture and setup"

git add SETUP_INSTRUCTIONS.md
git commit -m "docs: add detailed setup instructions"
```

## Best Practices
- Keep commits small and focused
- Use conventional commit format: `type(scope): message`
- Types: feat, fix, docs, style, refactor, test, chore
- Write clear, descriptive messages
- Commit working code only
