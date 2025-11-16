// Main application - Real-time camera processing
import { CameraSimulator } from './camera-simulator.js';
import { EdgeDetector } from './edge-detector.js';
class EdgeDetectionApp {
    constructor() {
        this.isRunning = false;
        this.animationId = 0;
        this.frameCount = 0;
        this.lastFpsTime = 0;
        this.currentFps = 0;
        this.camera = new CameraSimulator();
        this.detector = new EdgeDetector();
        this.canvas = document.getElementById('outputCanvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
        this.setupUI();
        console.log('EdgeDetectionApp initialized');
    }
    setupUI() {
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const modeButtons = document.querySelectorAll('.mode-btn');
        console.log('Setting up UI...');
        console.log('Start button:', startBtn);
        console.log('Mode buttons:', modeButtons.length);
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                console.log('Start button clicked');
                this.start();
            });
        }
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                console.log('Stop button clicked');
                this.stop();
            });
        }
        modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                console.log('Mode button clicked');
                const target = e.currentTarget;
                const mode = parseInt(target.dataset.mode || '0');
                console.log('Switching to mode:', mode);
                this.setMode(mode);
                // Update active state
                modeButtons.forEach(b => b.classList.remove('active'));
                target.classList.add('active');
            });
        });
        console.log('UI setup complete');
    }
    async start() {
        console.log('Starting camera...');
        const statusEl = document.getElementById('status');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        const errorMsg = document.getElementById('errorMsg');
        statusEl.textContent = '⏳ Starting camera...';
        startBtn.disabled = true;
        try {
            const success = await this.camera.start();
            console.log('Camera start result:', success);
            if (!success) {
                console.error('Camera failed to start');
                statusEl.textContent = '❌ Camera access denied';
                errorMsg.textContent = 'Could not access camera. Please grant camera permissions and reload the page.';
                errorMsg.style.display = 'block';
                startBtn.disabled = false;
                return;
            }
            const res = this.camera.getResolution();
            console.log('Camera resolution:', res);
            this.canvas.width = res.width;
            this.canvas.height = res.height;
            document.getElementById('resolution').textContent = `${res.width}x${res.height}`;
            this.isRunning = true;
            this.lastFpsTime = performance.now();
            this.frameCount = 0;
            statusEl.textContent = '✅ Camera Active';
            stopBtn.disabled = false;
            errorMsg.style.display = 'none';
            console.log('Starting frame processing...');
            this.processFrame();
        }
        catch (error) {
            console.error('Error starting camera:', error);
            statusEl.textContent = '❌ Error starting camera';
            errorMsg.textContent = `Error: ${error}`;
            errorMsg.style.display = 'block';
            startBtn.disabled = false;
        }
    }
    stop() {
        console.log('Stopping camera...');
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.camera.stop();
        const statusEl = document.getElementById('status');
        const startBtn = document.getElementById('startBtn');
        const stopBtn = document.getElementById('stopBtn');
        statusEl.textContent = '⏸️ Stopped';
        startBtn.disabled = false;
        stopBtn.disabled = true;
        console.log('Camera stopped');
    }
    setMode(mode) {
        console.log('Setting mode to:', mode);
        this.detector.setMode(mode);
        const modeText = this.detector.getModeString();
        document.getElementById('mode').textContent = modeText;
        console.log('Mode set to:', modeText);
    }
    processFrame() {
        if (!this.isRunning) {
            console.log('Processing stopped');
            return;
        }
        const startTime = performance.now();
        try {
            // Capture frame from camera
            const imageData = this.camera.captureFrame();
            if (imageData) {
                // Process frame
                const processed = this.detector.process(imageData);
                // Draw to canvas
                this.ctx.putImageData(processed, 0, 0);
                // Update processing time
                const procTime = performance.now() - startTime;
                document.getElementById('procTime').textContent = `${procTime.toFixed(1)}ms`;
                // Update FPS
                this.updateFPS();
            }
        }
        catch (error) {
            console.error('Error processing frame:', error);
        }
        // Continue processing
        this.animationId = requestAnimationFrame(() => this.processFrame());
    }
    updateFPS() {
        this.frameCount++;
        const currentTime = performance.now();
        const elapsed = currentTime - this.lastFpsTime;
        if (elapsed >= 1000) {
            this.currentFps = Math.round((this.frameCount * 1000) / elapsed);
            document.getElementById('fps').textContent = this.currentFps.toString();
            this.frameCount = 0;
            this.lastFpsTime = currentTime;
        }
    }
}
// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing app...');
        new EdgeDetectionApp();
    });
}
else {
    console.log('DOM already loaded, initializing app...');
    new EdgeDetectionApp();
}
//# sourceMappingURL=app.js.map