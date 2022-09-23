import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { videoOptions } from "../../models/CaptureOptions";
import { getVideo, takePhoto, savePhoto } from "./cameraFunctions";

const Camera = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    // const [hasPhoto, setHasPhoto] = useState<boolean>(false);

    useEffect(() => {
        getVideo(videoOptions, videoRef);
    }, [videoRef]);

    return (
        <section>
            <section className="camera-container" > 
                <video className="video" ref={videoRef} />
            
                <canvas className="photo hidden" ref={photoRef} />
             </section>

            <button className="camera-btn" onClick={()=>{ 
                takePhoto(videoRef, photoRef) 
                savePhoto(photoRef)
                videoRef.current?.classList.toggle('hidden')
                photoRef.current?.classList.toggle('hidden')
                } }>Föreviga ett ögonblick</button>

            
            <Link to='/user/' ><button>Gallery</button></Link>

        </section>
    )
};

export default Camera;