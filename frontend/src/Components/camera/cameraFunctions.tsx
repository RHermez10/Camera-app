import { PhotoObj } from "../../models/DataObjects";
import { CaptureOptions } from "../../models/CaptureOptions";

export const getVideo = (captureOptions: CaptureOptions, videoRef: React.RefObject<HTMLVideoElement>): void => {
    navigator.mediaDevices.getUserMedia(captureOptions)
        .then((Stream: MediaStream): void => {
            const video: HTMLVideoElement | null = videoRef.current;

            if (video !== null) {
                video.srcObject = Stream;
                video.play();
            };
        })
        .catch((err: Error): void => console.error(err));
};

export const takePhoto = (videoRef: React.RefObject<HTMLVideoElement>, photoRef: React.RefObject<HTMLCanvasElement>): void => {
    const width: number = 414;
    const height: number = width;

    const video: HTMLVideoElement | null = videoRef.current;
    const photo: HTMLCanvasElement | null = photoRef.current;

    if (photo !== null && video !== null) {
        photo.width = width;
        photo.height = height;

        const ctx: CanvasRenderingContext2D | null = photo.getContext('2d');

        if (ctx !== null) {
            ctx.drawImage(video, 0, 0, width, height);
        };
    };
};

export const savePhoto = async (photoRef: React.RefObject<HTMLCanvasElement>): Promise<any> => {
    const photo: HTMLCanvasElement | null = photoRef.current;
    const saved: string | undefined = photo?.toDataURL('image/jpeg', 0.1);
    const photographer: string | null = sessionStorage.getItem('loggedIn');

    if (saved === undefined || photographer === null) {
        return;
    };
    
    const photoObj: PhotoObj = {
        url: saved,
        photographer: photographer
    };

    try {
        const response: Response = await fetch('http://localhost:1337/gallery', {
            method: "POST",
            body: JSON.stringify(photoObj),
            headers: { "Content-Type": "application/json" },
        });

    } catch (err) {
        console.error('Error in posting photo: ', err);
    };
};