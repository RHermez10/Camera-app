import { ReactElement, useEffect, useRef, useState } from "react";
import { videoOptions } from "../../models/CaptureOptions";
import { getVideo, takePhoto, savePhoto } from "./cameraFunctions";
import styles from './Camera.module.css';

const Camera = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [captured, setCaptured] = useState<boolean>(false);

    const capture = (): void => {
        // Take photo and save photo
        takePhoto(videoRef, photoRef);
        savePhoto(photoRef);

        // Show photo
        videoRef.current?.classList.toggle(styles.hidden);
        photoRef.current?.classList.toggle(styles.hidden);

        // Set state to handle button rerender
        setCaptured(true);
    };

    const backToCamera = (): void => {
        // Show stream
        videoRef.current?.classList.toggle(styles.hidden);
        photoRef.current?.classList.toggle(styles.hidden);

        // Set state to handle button rerender
        setCaptured(false);
    };

    useEffect((): void => {
        getVideo(videoOptions, videoRef);
    }, [videoRef]);

    return (
        <section className={styles.Camera}>
            <section className={styles.cameraContainer} >
                <video className={styles.video} ref={videoRef} />
                <canvas className={`${styles.photo} ${styles.hidden}`} ref={photoRef} />
            </section>
            <button className="button" onClick={captured ? backToCamera : capture}>{captured ? 'Fånga ett nytt ögonblick' : 'Föreviga ett ögonblick'}</button>
        </section>
    )
};

export default Camera;