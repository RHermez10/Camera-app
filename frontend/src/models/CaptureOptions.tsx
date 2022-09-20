export interface CaptureOptions {
    audio: boolean,
    video: boolean | {
        width: number,
        height: number
    }
};

export const videoOptions: CaptureOptions = {
    audio: false,
    video: { width: 414, height: 414 }
};