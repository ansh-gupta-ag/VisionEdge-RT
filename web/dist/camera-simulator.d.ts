export declare class CameraSimulator {
    private video;
    private canvas;
    private ctx;
    private stream;
    private isReady;
    constructor();
    start(): Promise<boolean>;
    captureFrame(): ImageData | null;
    getResolution(): {
        width: number;
        height: number;
    };
    stop(): void;
}
//# sourceMappingURL=camera-simulator.d.ts.map