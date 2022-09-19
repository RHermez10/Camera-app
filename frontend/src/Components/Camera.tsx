import React, {ReactElement, useRef,useState} from "react";
import { CaptureOptions } from "../models/CaptureOptions";
import { useUserMedia } from "./useUserMedia";

const CAPTURE_OPTIONS: CaptureOptions = {
    audio: false,
    video: {
        facingMode: "environment"
    }
}

const Camera = (): ReactElement  => {

    const videoRef = useRef<HTMLVideoElement>(null);
const mediaStream = useUserMedia(CAPTURE_OPTIONS)

if (mediaStream && videoRef.current && !videoRef.current.srcObject){
    videoRef.current.srcObject = mediaStream
}

function handleCanPlay(): void{
    if (videoRef.current !== null) {
         videoRef.current.play()
    }
    
}
    return(
        <section>

            
            <h1>hej</h1>
  
             <video width={640} height={480}  ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
           
        </section>
     
    )

};

export default Camera;