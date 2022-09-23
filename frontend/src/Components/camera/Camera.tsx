import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { videoOptions } from "../../models/CaptureOptions";
import { getVideo, takePhoto, savePhoto } from "./cameraFunctions";

const Camera = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [captured,setCaptured]= useState<boolean>(false);

    function capture(){
                takePhoto(videoRef, photoRef) 
                savePhoto(photoRef)
                videoRef.current?.classList.toggle('hidden')
                photoRef.current?.classList.toggle('hidden')

                setCaptured(true)
    }

    function backToCamera(){
         videoRef.current?.classList.toggle('hidden')
         photoRef.current?.classList.toggle('hidden')
         setCaptured(false)

    }


    useEffect(() => {
        getVideo(videoOptions, videoRef);
    }, [videoRef]);

    return (
        <section>
            <section className="camera-container" > 
                <video className="video" ref={videoRef} />
            
                <canvas className="photo hidden" ref={photoRef} />
             </section>

            <button className="camera-btn" onClick={captured ? backToCamera : capture }>Föreviga ett ögonblick</button>

            
            <Link to='/user/' ><button>Gallery</button></Link>

        </section>
    )
};

export default Camera;