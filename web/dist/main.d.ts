interface FrameData {
    base64Image: string;
    width: number;
    height: number;
    fps: number;
    mode: string;
    timestamp: number;
}
declare class FrameViewer {
    private frameElement;
    private fpsElement;
    private resolutionElement;
    private modeElement;
    private timestampElement;
    constructor();
    loadFrame(data: FrameData): void;
    loadSampleFrame(): void;
    private generatePlaceholder;
}
//# sourceMappingURL=main.d.ts.map