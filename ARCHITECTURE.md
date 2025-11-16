# Architecture Overview

## System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Android App                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐      ┌──────────────┐                   │
│  │   Camera2    │─────▶│ ImageReader  │                   │
│  │     API      │      │ YUV_420_888  │                   │
│  └──────────────┘      └──────┬───────┘                   │
│                               │                            │
│                               ▼                            │
│                        ┌──────────────┐                   │
│                        │ NativeBridge │                   │
│                        │     (JNI)    │                   │
│                        └──────┬───────┘                   │
│                               │                            │
│  ┌────────────────────────────┼────────────────────────┐  │
│  │         Native Layer (C++)  │                        │  │
│  │                             ▼                        │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         OpenCV Processing                    │   │  │
│  │  │  • YUV → RGBA conversion                     │   │  │
│  │  │  • Grayscale conversion                      │   │  │
│  │  │  • Gaussian blur                             │   │  │
│  │  │  • Canny edge detection                      │   │  │
│  │  └──────────────────┬───────────────────────────┘   │  │
│  │                     │                                │  │
│  │                     ▼                                │  │
│  │  ┌──────────────────────────────────────────────┐   │  │
│  │  │         Processed RGBA Buffer                │   │  │
│  │  └──────────────────┬───────────────────────────┘   │  │
│  └─────────────────────┼──────────────────────────────┘  │
│                        │                                  │
│                        ▼                                  │
│                 ┌──────────────┐                         │
│                 │  GLRenderer  │                         │
│                 │  (OpenGL ES) │                         │
│                 └──────┬───────┘                         │
│                        │                                  │
│                        ▼                                  │
│                 ┌──────────────┐                         │
│                 │  TextureView │                         │
│                 │   (Display)  │                         │
│                 └──────────────┘                         │
│                                                           │
└───────────────────────────────────────────────────────────┘

                           │
                           │ Export frame
                           ▼
                    
┌─────────────────────────────────────────────────────────────┐
│                    TypeScript Web Viewer                    │
├─────────────────────────────────────────────────────────────┤
│  • Display base64 encoded frame                             │
│  • Show FPS, resolution, mode                               │
│  • Simple HTTP server                                       │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Camera Layer (Kotlin)
- **CameraManager.kt**: Manages Camera2 API
  - Opens camera device
  - Creates capture session with ImageReader
  - Captures YUV_420_888 frames at 640x480
  - Converts Image to ByteBuffer
  - Passes frames to processing pipeline

### 2. JNI Bridge (Kotlin ↔ C++)
- **NativeBridge.kt**: Kotlin interface
  - `init()`: Initialize native library
  - `initProcessor(width, height)`: Allocate matrices
  - `setProcessingMode(mode)`: Switch between RAW/GRAYSCALE/EDGES
  - `processFrame(data, width, height)`: Process single frame
  - `release()`: Clean up resources

### 3. Native Processing (C++)
- **native-lib.cpp**: OpenCV processing
  - Pre-allocated cv::Mat for zero-copy performance
  - YUV → RGBA conversion using cv::cvtColor
  - Three processing modes:
    - **RAW**: Pass-through
    - **GRAYSCALE**: Convert to grayscale
    - **EDGES**: Gaussian blur + Canny edge detection
  - Returns processed RGBA buffer via DirectByteBuffer

### 4. OpenGL Rendering (Kotlin)
- **GLRenderer.kt**: OpenGL ES 2.0 renderer
  - Creates GL_TEXTURE_2D
  - Updates texture with processed frame data
  - Renders fullscreen quad with texture
  - Vertex shader: pass-through with texture coords
  - Fragment shader: sample texture

### 5. Main Activity (Kotlin)
- **MainActivity.kt**: Orchestrates components
  - Requests camera permission
  - Initializes camera and renderer
  - Handles frame callbacks
  - Calculates and displays FPS
  - Provides mode toggle button

### 6. Web Viewer (TypeScript)
- **main.ts**: Frame display logic
  - Loads base64 encoded images
  - Updates stats (FPS, resolution, mode)
  - Generates placeholder for demo
- **server.ts**: Express server
  - Serves static HTML/JS
  - Runs on port 3000

## Data Flow

1. **Frame Capture**: Camera2 → ImageReader (YUV format)
2. **Format Conversion**: YUV ByteBuffer → JNI → C++
3. **Processing**: OpenCV operations on cv::Mat
4. **Return**: Processed RGBA → ByteBuffer → Kotlin
5. **Rendering**: ByteBuffer → GL Texture → Screen
6. **Display**: TextureView shows processed frame

## Performance Optimizations

- **Pre-allocated Matrices**: Avoid per-frame allocation
- **Direct ByteBuffer**: Zero-copy data transfer
- **Native Processing**: C++ with -O3 optimization
- **Fixed Resolution**: 640x480 for consistent performance
- **Frame Dropping**: Queue size = 2 to prevent backlog
- **NEON Support**: ARM SIMD via OpenCV

## Threading Model

- **Main Thread**: UI updates, button clicks
- **Camera Thread**: Frame capture (HandlerThread)
- **Processing Thread**: Native OpenCV processing
- **GL Thread**: Texture updates and rendering

## Build System

- **Gradle**: Android app build
- **CMake**: Native library compilation
- **NDK**: C++ toolchain
- **OpenCV**: Linked as external library

## Target Performance

- **FPS**: 15+ frames per second
- **Latency**: < 100ms end-to-end
- **Resolution**: 640x480 (VGA)
- **CPU Usage**: < 50% on mid-range device
