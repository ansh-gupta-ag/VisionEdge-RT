# JNI - Native OpenCV Processing

This folder contains C++ code for OpenCV image processing.

## Files

- `src/native-lib.cpp` - Main JNI implementation with OpenCV
- `include/` - Header files (if any)

## What It Does

1. **YUV to RGBA Conversion** - Converts camera YUV format to RGBA
2. **Grayscale Processing** - Converts to grayscale using OpenCV
3. **Canny Edge Detection** - Applies Gaussian blur + Canny algorithm
4. **Memory Management** - Pre-allocated matrices for performance

## Functions

- `init()` - Initialize native library
- `initProcessor(width, height)` - Allocate processing matrices
- `setProcessingMode(mode)` - Switch between RAW/GRAYSCALE/EDGES
- `processFrame(buffer, width, height)` - Process single frame
- `release()` - Clean up resources

## Build

This is compiled via CMake (see `app/CMakeLists.txt`)
