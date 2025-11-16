#include <jni.h>
#include <android/log.h>
#include <opencv2/opencv.hpp>
#include <opencv2/imgproc.hpp>
#include <string>

#define LOG_TAG "NativeLib"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

// Processing mode
enum ProcessingMode {
    RAW = 0,
    GRAYSCALE = 1,
    EDGES = 2
};

static ProcessingMode currentMode = RAW;
static cv::Mat yuvMat, rgbaMat, grayMat, edgesMat, outputMat;
static int frameWidth = 0;
static int frameHeight = 0;

extern "C" JNIEXPORT void JNICALL
Java_com_example_edgeviewer_NativeBridge_init(JNIEnv* env, jobject) {
    LOGI("Native library initialized");
}

extern "C" JNIEXPORT void JNICALL
Java_com_example_edgeviewer_NativeBridge_initProcessor(
    JNIEnv* env, jobject, jint width, jint height) {
    
    frameWidth = width;
    frameHeight = height;
    
    // Pre-allocate matrices
    yuvMat = cv::Mat(height + height/2, width, CV_8UC1);
    rgbaMat = cv::Mat(height, width, CV_8UC4);
    grayMat = cv::Mat(height, width, CV_8UC1);
    edgesMat = cv::Mat(height, width, CV_8UC1);
    outputMat = cv::Mat(height, width, CV_8UC4);
    
    LOGI("Processor initialized: %dx%d", width, height);
}

extern "C" JNIEXPORT void JNICALL
Java_com_example_edgeviewer_NativeBridge_setProcessingMode(
    JNIEnv* env, jobject, jint mode) {
    currentMode = static_cast<ProcessingMode>(mode);
    LOGI("Processing mode set to: %d", mode);
}

extern "C" JNIEXPORT jobject JNICALL
Java_com_example_edgeviewer_NativeBridge_processFrame(
    JNIEnv* env, jobject, jobject inputBuffer, jint width, jint height) {
    
    // Initialize if needed
    if (frameWidth != width || frameHeight != height) {
        Java_com_example_edgeviewer_NativeBridge_initProcessor(
            env, nullptr, width, height);
    }
    
    // Get input data
    uint8_t* inputData = static_cast<uint8_t*>(
        env->GetDirectBufferAddress(inputBuffer));
    
    if (!inputData) {
        LOGE("Failed to get input buffer address");
        return nullptr;
    }
    
    // Wrap input as YUV Mat
    cv::Mat yuvInput(height + height/2, width, CV_8UC1, inputData);
    
    // Convert YUV to RGBA
    cv::cvtColor(yuvInput, rgbaMat, cv::COLOR_YUV2RGBA_NV21);
    
    // Process based on mode
    switch (currentMode) {
        case RAW:
            outputMat = rgbaMat.clone();
            break;
            
        case GRAYSCALE:
            cv::cvtColor(rgbaMat, grayMat, cv::COLOR_RGBA2GRAY);
            cv::cvtColor(grayMat, outputMat, cv::COLOR_GRAY2RGBA);
            break;
            
        case EDGES:
            cv::cvtColor(rgbaMat, grayMat, cv::COLOR_RGBA2GRAY);
            cv::GaussianBlur(grayMat, grayMat, cv::Size(5, 5), 1.5);
            cv::Canny(grayMat, edgesMat, 50, 150);
            cv::cvtColor(edgesMat, outputMat, cv::COLOR_GRAY2RGBA);
            break;
    }
    
    // Create output ByteBuffer
    jlong bufferSize = outputMat.total() * outputMat.elemSize();
    jobject outputBuffer = env->NewDirectByteBuffer(outputMat.data, bufferSize);
    
    return outputBuffer;
}

extern "C" JNIEXPORT void JNICALL
Java_com_example_edgeviewer_NativeBridge_release(JNIEnv* env, jobject) {
    yuvMat.release();
    rgbaMat.release();
    grayMat.release();
    edgesMat.release();
    outputMat.release();
    LOGI("Native resources released");
}
