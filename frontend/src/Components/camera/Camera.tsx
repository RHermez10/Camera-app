import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { videoOptions } from "../../models/CaptureOptions";
import { getVideo, takePhoto, savePhoto } from "./cameraFunctions";
import styles from './Camera.module.css';
import galleryIcon from './gallery-icon.svg';

const Camera = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [captured,setCaptured]= useState<boolean>(false);

    function capture(){
                takePhoto(videoRef, photoRef) 
                savePhoto(photoRef)
                videoRef.current?.classList.toggle(styles.hidden)
                photoRef.current?.classList.toggle(styles.hidden)

                setCaptured(true)
    }

    function backToCamera(){
         videoRef.current?.classList.toggle(styles.hidden)
         photoRef.current?.classList.toggle(styles.hidden)
         setCaptured(false)

    }


    useEffect(() => {
        getVideo(videoOptions, videoRef);
    }, [videoRef]);

    return (
        <section>
            <section className={styles.cameraContainer} > 
                <video className={styles.video} ref={videoRef} />
            
                <canvas className={ `${styles.photo} ${styles.hidden}`} ref={photoRef} />
             </section>

            <button className={styles.cameraBtn} onClick={captured ? backToCamera : capture }>Föreviga ett ögonblick</button>

            
            <Link to='/user/' > <img className="nav-icon" src={galleryIcon} alt="galleryIcon" /> </Link>

        </section>
    )
};

export default Camera;