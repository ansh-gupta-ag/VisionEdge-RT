# Testing Checklist

## Pre-Build Tests

### Environment Setup
- [ ] Android Studio installed and updated
- [ ] NDK r23b+ installed via SDK Manager
- [ ] CMake 3.10+ installed
- [ ] OpenCV Android SDK downloaded and extracted to `opencv/`
- [ ] JDK 17 configured
- [ ] Git initialized

### Project Structure
- [ ] All folders created correctly
- [ ] Gradle files present
- [ ] CMakeLists.txt configured
- [ ] Native source files in place
- [ ] Web viewer files created

## Build Tests

### Gradle Build
```bash
./gradlew clean
./gradlew assembleDebug
```
- [ ] Build completes without errors
- [ ] APK generated in `app/build/outputs/apk/debug/`
- [ ] Native library (.so) compiled for arm64-v8a and armeabi-v7a

### Native Build
- [ ] CMake finds OpenCV
- [ ] C++ code compiles without warnings
- [ ] JNI functions properly linked

### Web Build
```bash
cd web
npm install
npm run build
```
- [ ] TypeScript compiles without errors
- [ ] Output in `web/dist/`

## Runtime Tests

### Installation
```bash
adb devices
adb install -r app/build/outputs/apk/debug/app-debug.apk
```
- [ ] App installs successfully
- [ ] No installation errors

### Permissions
- [ ] Camera permission requested on first launch
- [ ] App handles permission denial gracefully
- [ ] Permission grant allows camera access

### Camera Functionality
- [ ] Camera preview appears
- [ ] Preview is not upside down or mirrored
- [ ] Frame rate is stable
- [ ] No crashes during camera operation

### Processing Modes
- [ ] **RAW mode**: Shows unprocessed camera feed
- [ ] **GRAYSCALE mode**: Shows grayscale conversion
- [ ] **EDGES mode**: Shows Canny edge detection
- [ ] Toggle button switches modes correctly
- [ ] Mode changes are smooth (no lag)

### Performance
- [ ] FPS counter displays and updates
- [ ] FPS is 10+ (target: 15+)
- [ ] No frame freezing
- [ ] CPU usage reasonable (check with `adb shell top`)
- [ ] No memory leaks (run for 5+ minutes)

### UI/UX
- [ ] Resolution text displays correctly
- [ ] FPS counter updates every second
- [ ] Toggle button is responsive
- [ ] Layout looks good on device
- [ ] No UI elements overlap

### Stability
- [ ] App runs for 5+ minutes without crash
- [ ] Rotation handled (if enabled)
- [ ] Background/foreground transitions work
- [ ] Clean exit on back button

## Web Viewer Tests

### Server
```bash
cd web
npm start
```
- [ ] Server starts on port 3000
- [ ] No errors in console

### Browser
- [ ] Open http://localhost:3000
- [ ] Page loads correctly
- [ ] Placeholder image displays
- [ ] Stats show sample data
- [ ] Refresh button works
- [ ] Styling looks good

## Integration Tests

### End-to-End Flow
- [ ] Camera → Native → OpenGL pipeline works
- [ ] Frame data flows correctly
- [ ] No data corruption
- [ ] Timing is acceptable

### Edge Cases
- [ ] Low light conditions
- [ ] Fast camera movement
- [ ] Covering camera lens
- [ ] Switching apps and returning

## Logging Tests

### Android Logs
```bash
adb logcat | grep -i "edgeviewer\|opencv\|native"
```
- [ ] Native library loads successfully
- [ ] OpenCV initialization succeeds
- [ ] Frame processing logs appear
- [ ] No error messages

### Performance Profiling
```bash
adb shell dumpsys gfxinfo com.example.edgeviewer
```
- [ ] Frame rendering time < 66ms (15 FPS)
- [ ] No jank detected

## Documentation Tests

- [ ] README.md is complete and accurate
- [ ] SETUP_INSTRUCTIONS.md is clear
- [ ] ARCHITECTURE.md explains system
- [ ] Code comments are helpful
- [ ] Git commits follow plan

## Submission Checklist

- [ ] All code committed to Git
- [ ] Meaningful commit messages
- [ ] README includes screenshots/GIF
- [ ] APK builds successfully
- [ ] Web viewer runs
- [ ] No hardcoded secrets or PII
- [ ] .gitignore excludes build artifacts
- [ ] Repository is public (if required)

## Known Issues to Document

List any known issues or limitations:
- [ ] Emulator performance (recommend real device)
- [ ] Specific device compatibility
- [ ] OpenCV version requirements
- [ ] Any workarounds needed

## Final Verification

Before submission:
- [ ] Clone repo to fresh directory
- [ ] Follow SETUP_INSTRUCTIONS.md exactly
- [ ] Verify build works from scratch
- [ ] Test on at least one physical device
- [ ] Record demo video/GIF
- [ ] Double-check all requirements met
