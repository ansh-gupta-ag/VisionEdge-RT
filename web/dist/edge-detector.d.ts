export declare enum ProcessingMode {
    RAW = 0,
    GRAYSCALE = 1,
    EDGES = 2
}
export declare class EdgeDetector {
    private mode;
    setMode(mode: ProcessingMode): void;
    getMode(): ProcessingMode;
    getModeString(): string;
    process(imageData: ImageData): ImageData;
    private toGrayscale;
    private detectEdges;
    private gaussianBlur;
}
//# sourceMappingURL=edge-detector.d.ts.map