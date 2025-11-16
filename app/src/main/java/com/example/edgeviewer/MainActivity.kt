package com.example.edgeviewer

import android.Manifest
import android.content.pm.PackageManager
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.edgeviewer.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var cameraManager: CameraManager
    private lateinit var glRenderer: GLRenderer
    
    private var processingMode = ProcessingMode.RAW
    
    companion object {
        private const val REQUEST_CAMERA_PERMISSION = 1
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        // Initialize native library
        NativeBridge.init()
        
        setupUI()
        
        if (checkCameraPermission()) {
            initializeCamera()
        } else {
            requestCameraPermission()
        }
    }
    
    private fun setupUI() {
        binding.toggleButton.setOnClickListener {
            processingMode = when (processingMode) {
                ProcessingMode.RAW -> ProcessingMode.GRAYSCALE
                ProcessingMode.GRAYSCALE -> ProcessingMode.EDGES
                ProcessingMode.EDGES -> ProcessingMode.RAW
            }
            NativeBridge.setProcessingMode(processingMode.ordinal)
            updateModeText()
        }
        updateModeText()
    }
    
    private fun updateModeText() {
        val modeText = when (processingMode) {
            ProcessingMode.RAW -> getString(R.string.mode_raw)
            ProcessingMode.GRAYSCALE -> getString(R.string.mode_grayscale)
            ProcessingMode.EDGES -> getString(R.string.mode_edges)
        }
        binding.toggleButton.text = "Mode: $modeText"
    }
    
    private fun initializeCamera() {
        cameraManager = CameraManager(this, binding.textureView)
        glRenderer = GLRenderer(binding.textureView)
        
        cameraManager.setFrameCallback { width, height, data ->
            // Process frame in native code
            val processedData = NativeBridge.processFrame(data, width, height)
            
            // Update GL texture
            glRenderer.updateTexture(processedData, width, height)
            
            // Update FPS
            updateFPS()
        }
        
        cameraManager.start()
    }
    
    private var frameCount = 0
    private var lastFpsTime = System.currentTimeMillis()
    
    private fun updateFPS() {
        frameCount++
        val currentTime = System.currentTimeMillis()
        val elapsed = currentTime - lastFpsTime
        
        if (elapsed >= 1000) {
            val fps = (frameCount * 1000.0 / elapsed).toInt()
            runOnUiThread {
                binding.fpsText.text = "FPS: $fps"
            }
            frameCount = 0
            lastFpsTime = currentTime
        }
    }
    
    private fun checkCameraPermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.CAMERA
        ) == PackageManager.PERMISSION_GRANTED
    }
    
    private fun requestCameraPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.CAMERA),
            REQUEST_CAMERA_PERMISSION
        )
    }
    
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_CAMERA_PERMISSION) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                initializeCamera()
            } else {
                Toast.makeText(
                    this,
                    getString(R.string.permission_camera_rationale),
                    Toast.LENGTH_LONG
                ).show()
                finish()
            }
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
        if (::cameraManager.isInitialized) {
            cameraManager.stop()
        }
        if (::glRenderer.isInitialized) {
            glRenderer.release()
        }
    }
}

enum class ProcessingMode {
    RAW, GRAYSCALE, EDGES
}
