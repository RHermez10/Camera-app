export interface CaptureOptions {
    audio: boolean,
    video: boolean | {
        width: number | { ideal: number },
        height: number | { ideal: number }
    }
};

export const videoOptions: CaptureOptions = {
    audio: false,
    video: { width: {ideal: 720}, height: {ideal: 720} }
};