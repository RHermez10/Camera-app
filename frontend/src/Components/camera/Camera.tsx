import { ReactElement, useEffect, useRef, useState } from "react";
import { CaptureOptions, videoOptions } from "../../models/CaptureOptions";

const Camera = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);

    const [hasPhoto, setHasPhoto] = useState<boolean>(false);
    const [saved, setSaved] = useState<string>('');

    // Flytta ut till modul
    const getVideo = (captureOptions: CaptureOptions): void => {
        navigator.mediaDevices.getUserMedia(captureOptions)
            .then((Stream: MediaStream): void => {
                let video: HTMLVideoElement | null = videoRef.current;

                if (video !== null) {
                    video.srcObject = Stream;
                    video.play();
                };
            })
            .catch((err: Error): void => console.error(err));
    }

    const takePhoto = () => {
        const width = 414;
        const height = width/(4/3);

        let video = videoRef.current;
        let photo = photoRef.current;

        if (photo !== null && video !== null) {
            photo.width = width;
            photo.height = height;

            let ctx = photo.getContext('2d');

            if (ctx !== null) {
                ctx.drawImage(video, 0, 0, width, height);

                setHasPhoto(true);
            }
        }
    }

    const savePhoto = ():void => {
        let photo = photoRef.current;
        let saved = photo?.toDataURL('img/jpeg');
        if (saved !== undefined) {
            setSaved(saved);
        }
        
    }

    useEffect(() => {
        getVideo(videoOptions)
    }, [videoRef])

    return (
        <section>

            <video ref={videoRef} />
            <button onClick={takePhoto}>Capture</button>

            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef} />
                <button onClick={savePhoto}>Save</button>
                {}
            </div>
            <img src={saved} />

        </section>
    )

}

export default Camera;