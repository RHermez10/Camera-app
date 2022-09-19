export interface CaptureOptions{
    audio: boolean,
    video: boolean | {
        width: number,
        height: number
    }
};