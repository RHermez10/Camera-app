import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { videoOptions } from "../../models/CaptureOptions";
import { getVideo, takePhoto, savePhoto } from "./cameraFunctions";

const Camera = (): ReactElement => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const photoRef = useRef<HTMLCanvasElement>(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);

    useEffect(() => {
        getVideo(videoOptions, videoRef);
    }, [videoRef]);

    return (
        <section>

            <video ref={videoRef} />
            <button onClick={()=>{ takePhoto(videoRef, photoRef, setHasPhoto) }}>Capture</button>

            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef} />
                <button onClick={ ()=>{ savePhoto(photoRef) }}>Save</button>
            </div>
            
            <Link to='/user/' ><button>Gallery</button></Link>

        </section>
    )
};

export default Camera;