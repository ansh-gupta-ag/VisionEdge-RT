// Real-time edge detection using Sobel operator
export var ProcessingMode;
(function (ProcessingMode) {
    ProcessingMode[ProcessingMode["RAW"] = 0] = "RAW";
    ProcessingMode[ProcessingMode["GRAYSCALE"] = 1] = "GRAYSCALE";
    ProcessingMode[ProcessingMode["EDGES"] = 2] = "EDGES";
})(ProcessingMode || (ProcessingMode = {}));
export class EdgeDetector {
    constructor() {
        this.mode = ProcessingMode.RAW;
    }
    setMode(mode) {
        this.mode = mode;
    }
    getMode() {
        return this.mode;
    }
    getModeString() {
        switch (this.mode) {
            case ProcessingMode.RAW: return 'Raw';
            case ProcessingMode.GRAYSCALE: return 'Grayscale';
            case ProcessingMode.EDGES: return 'Edges';
        }
    }
    process(imageData) {
        switch (this.mode) {
            case ProcessingMode.RAW:
                return imageData;
            case ProcessingMode.GRAYSCALE:
                return this.toGrayscale(imageData);
            case ProcessingMode.EDGES:
                return this.detectEdges(imageData);
        }
    }
    toGrayscale(imageData) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
        }
        return imageData;
    }
    detectEdges(imageData) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        // Convert to grayscale first
        const gray = new Uint8ClampedArray(width * height);
        for (let i = 0; i < data.length; i += 4) {
            const idx = i / 4;
            gray[idx] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        }
        // Apply Gaussian blur
        const blurred = this.gaussianBlur(gray, width, height);
        // Sobel edge detection
        const edges = new Uint8ClampedArray(width * height);
        const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
        const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let gx = 0, gy = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = (y + ky) * width + (x + kx);
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        gx += blurred[idx] * sobelX[kernelIdx];
                        gy += blurred[idx] * sobelY[kernelIdx];
                    }
                }
                const magnitude = Math.sqrt(gx * gx + gy * gy);
                edges[y * width + x] = magnitude > 50 ? 255 : 0;
            }
        }
        // Convert back to RGBA
        for (let i = 0; i < edges.length; i++) {
            const val = edges[i];
            data[i * 4] = val;
            data[i * 4 + 1] = val;
            data[i * 4 + 2] = val;
            data[i * 4 + 3] = 255;
        }
        return imageData;
    }
    gaussianBlur(data, width, height) {
        const result = new Uint8ClampedArray(data.length);
        const kernel = [1, 2, 1, 2, 4, 2, 1, 2, 1];
        const kernelSum = 16;
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let sum = 0;
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = (y + ky) * width + (x + kx);
                        const kernelIdx = (ky + 1) * 3 + (kx + 1);
                        sum += data[idx] * kernel[kernelIdx];
                    }
                }
                result[y * width + x] = sum / kernelSum;
            }
        }
        return result;
    }
}
//# sourceMappingURL=edge-detector.js.map