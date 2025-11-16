"use strict";
// Main TypeScript viewer for processed frames
class FrameViewer {
    constructor() {
        this.frameElement = document.getElementById('frame');
        this.fpsElement = document.getElementById('fps');
        this.resolutionElement = document.getElementById('resolution');
        this.modeElement = document.getElementById('mode');
        this.timestampElement = document.getElementById('timestamp');
    }
    loadFrame(data) {
        this.frameElement.src = `data:image/png;base64,${data.base64Image}`;
        this.fpsElement.textContent = `FPS: ${data.fps}`;
        this.resolutionElement.textContent = `Resolution: ${data.width}x${data.height}`;
        this.modeElement.textContent = `Mode: ${data.mode}`;
        this.timestampElement.textContent = `Updated: ${new Date(data.timestamp).toLocaleTimeString()}`;
    }
    loadSampleFrame() {
        // Sample frame data (placeholder)
        const sampleData = {
            base64Image: this.generatePlaceholder(),
            width: 640,
            height: 480,
            fps: 15,
            mode: 'Edges',
            timestamp: Date.now()
        };
        this.loadFrame(sampleData);
    }
    generatePlaceholder() {
        // Generate a simple placeholder image
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, 640, 480);
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, 540, 380);
        ctx.fillStyle = '#00ff00';
        ctx.font = '24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Edge Detection Sample', 320, 240);
        return canvas.toDataURL('image/png').split(',')[1];
    }
}
// Initialize viewer
document.addEventListener('DOMContentLoaded', () => {
    const viewer = new FrameViewer();
    viewer.loadSampleFrame();
    // Refresh button
    document.getElementById('refreshBtn')?.addEventListener('click', () => {
        viewer.loadSampleFrame();
    });
});
//# sourceMappingURL=main.js.map