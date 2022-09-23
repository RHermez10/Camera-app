import { photoObj } from "../../models/DataObjects";
import { CaptureOptions } from "../../models/CaptureOptions";

export const getVideo = (captureOptions: CaptureOptions, videoRef: React.RefObject<HTMLVideoElement>): void => {
    navigator.mediaDevices.getUserMedia(captureOptions)
        .then((Stream: MediaStream): void => {
            let video: HTMLVideoElement | null = videoRef.current;

            if (video !== null) {
                video.srcObject = Stream;
                video.play();
            };
        })
        .catch((err: Error): void => console.error(err));
};

export const takePhoto = (videoRef: React.RefObject<HTMLVideoElement>, photoRef: React.RefObject<HTMLCanvasElement>) => {
    const width = 414;
    const height = width;

    let video = videoRef.current;
    let photo = photoRef.current;

    if (photo !== null && video !== null) {
        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext('2d');

        if (ctx !== null) {
            ctx.drawImage(video, 0, 0, width, height);

            // setHasPhoto(true);
        };
    };
};

export const savePhoto = async (photoRef: React.RefObject<HTMLCanvasElement>): Promise<any> => {
    let photo = photoRef.current;
    let saved = photo?.toDataURL('image/jpeg', 0.1);
    let photographer = sessionStorage.getItem('loggedIn');

    console.log(photographer);

    if (saved === undefined || photographer === null) {
        return;
    };
    
    const photoObj: photoObj = {
        url: saved,
        photographer: photographer
    };

    try {
        const response = await fetch('http://localhost:1337/gallery', {
            method: "POST",
            body: JSON.stringify(photoObj),
            headers: { "Content-Type": "application/json" },
        });

        console.log(response);

    } catch (err) {
        console.error('Error in posting photo: ', err);
    };
};