import { ReactElement, useState } from "react";
import GalleryPhoto from "./GalleryPhoto";


const Gallery = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('user');
    
    // fetcha foton av användaren
    // rendera en GalleryPhoto per foto

    return (
        <article className="gallery grid-container">
            <h2>Gallery</h2>
            <GalleryPhoto url={'https://images.unsplash.com/photo-1529636600939-9edeb1f9719f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'} photographer={'Unsplash'} />
            <GalleryPhoto url={'https://images.unsplash.com/photo-1529636600939-9edeb1f9719f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'} photographer={'Unsplash'} />
            <GalleryPhoto url={'https://images.unsplash.com/photo-1529636600939-9edeb1f9719f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'} photographer={'Unsplash'} />
            <GalleryPhoto url={'https://images.unsplash.com/photo-1529636600939-9edeb1f9719f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'} photographer={'Unsplash'} />
        </article>
    )
}

export default Gallery;