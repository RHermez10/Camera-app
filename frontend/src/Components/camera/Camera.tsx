import { ReactElement, useEffect, useRef, useState } from "react";
import { CaptureOptions, videoOptions } from "../../models/CaptureOptions";

const Camera = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);

    const [hasPhoto, setHasPhoto] = useState<boolean>(false);

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

    const savePhoto = async (): Promise<any> => {
        let photo = photoRef.current;
        let saved = photo?.toDataURL('image/jpeg', 0.1);
        if (saved !== undefined) {
            console.log('STRINGIFIED: ', JSON.stringify(saved));
            try {
                const response = await fetch('http://localhost:1337/gallery', {
                    method: "POST",
                    body: JSON.stringify({data: saved}),
                    headers: { "Content-Type": "application/json" },
                });
                console.log(response);
            } catch(err) {
                console.error('Error in posting photo: ', err);
            };
        }; 
    };

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

        </section>
    )

}

export default Camera;