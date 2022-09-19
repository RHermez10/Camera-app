import { ReactElement, useEffect, useRef, useState } from "react";
import { CaptureOptions } from "../models/CaptureOptions";

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
                video.play();   // video?.play()
            };
        })
        .catch((err: Error): void => console.error(err));
    }


    useEffect(()=>{
        getVideo({audio: false, video: {width: 1920, height: 1080}})
    }, [videoRef])

    return (
        <section>
            <video ref={videoRef} />
        </section>
    )

}

export default Camera;