cmake_minimum_required(VERSION 3.22.1)
project(edgeviewer)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# OpenCV setup - adjust path if needed
set(OpenCV_DIR ${CMAKE_SOURCE_DIR}/../opencv/sdk/native/jni)
find_package(OpenCV REQUIRED)

# Include directories
include_directories(
    ${OpenCV_INCLUDE_DIRS}
    ${CMAKE_SOURCE_DIR}/src/main/cpp/include
)

# Source files
file(GLOB_RECURSE CPP_SOURCES
    ${CMAKE_SOURCE_DIR}/src/main/cpp/*.cpp
)

# Create shared library
add_library(native-lib SHARED ${CPP_SOURCES})

# Link libraries
target_link_libraries(native-lib
    ${OpenCV_LIBS}
    android
    log
    GLESv2
    EGL
)
