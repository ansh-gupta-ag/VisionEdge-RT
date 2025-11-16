// Camera simulator with real edge detection
export class CameraSimulator {
    private video: HTMLVideoElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private stream: MediaStream | null = null;
    private isReady: boolean = false;

    constructor() {
        console.log('CameraSimulator constructor');
        this.video = document.createElement('video');
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d', { willReadFrequently: true })!;
        this.video.setAttribute('playsinline', 'true');
        this.video.setAttribute('autoplay', 'true');
        this.video.muted = true;
    }

    async start(): Promise<boolean> {
        console.log('CameraSimulator.start() called');
        try {
            // Request camera access
            console.log('Requesting camera access...');
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    width: { ideal: 640 }, 
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: false
            });
            
            console.log('Camera access granted, stream:', this.stream);
            
            // Set video source
            this.video.srcObject = this.stream;
            
            // Wait for video to be ready
            await new Promise<void>((resolve, reject) => {
                this.video.onloadedmetadata = () => {
                    console.log('Video metadata loaded');
                    this.video.play()
                        .then(() => {
                            console.log('Video playing');
                            resolve();
                        })
                        .catch(reject);
                };
                
                this.video.onerror = () => {
                    console.error('Video error');
                    reject(new Error('Video failed to load'));
                };
                
                // Timeout after 5 seconds
                setTimeout(() => reject(new Error('Video load timeout')), 5000);
            });
            
            // Wait a bit for video dimensions
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const width = this.video.videoWidth || 640;
            const height = this.video.videoHeight || 480;
            
            console.log('Video dimensions:', width, 'x', height);
            
            this.canvas.width = width;
            this.canvas.height = height;
            this.isReady = true;
            
            console.log('Camera started successfully');
            return true;
        } catch (error) {
            console.error('Camera access failed:', error);
            if (error instanceof Error) {
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
            }
            return false;
        }
    }

    captureFrame(): ImageData | null {
        if (!this.isReady || !this.video.videoWidth || this.video.paused || this.video.ended) {
            return null;
        }
        
        try {
            this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
            return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        } catch (error) {
            console.error('Error capturing frame:', error);
            return null;
        }
    }

    getResolution(): { width: number; height: number } {
        return {
            width: this.canvas.width || 640,
            height: this.canvas.height || 480
        };
    }

    stop(): void {
        console.log('Stopping camera...');
        this.isReady = false;
        
        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                console.log('Stopping track:', track.kind);
                track.stop();
            });
            this.stream = null;
        }
        
        if (this.video) {
            this.video.srcObject = null;
        }
        
        console.log('Camera stopped');
    }
}
