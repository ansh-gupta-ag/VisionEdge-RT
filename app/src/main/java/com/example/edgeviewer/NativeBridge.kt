package com.example.edgeviewer

import java.nio.ByteBuffer

object NativeBridge {
    init {
        System.loadLibrary("native-lib")
    }
    
    external fun init()
    external fun initProcessor(width: Int, height: Int)
    external fun setProcessingMode(mode: Int)
    external fun processFrame(data: ByteBuffer, width: Int, height: Int): ByteBuffer
    external fun release()
}
