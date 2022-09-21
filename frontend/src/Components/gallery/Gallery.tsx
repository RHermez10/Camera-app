import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserPhotos } from "../../methods/fetchFunctions";
import { photoObj } from "../../models/DataObjects";
import GalleryPhoto from "./GalleryPhoto";


const Gallery = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('loggedIn');
    const [photoObjects, setPhotoObjects] = useState<photoObj[]>();

    const getUserPhotos = async (user: string) => {
        const userPhotos: photoObj[] = await fetchUserPhotos(user);
        setPhotoObjects(userPhotos);
    };

    const renderedPhotos = photoObjects?.map(photo =>
        < GalleryPhoto getUserPhotos={getUserPhotos} url={photo.url} photographer={photo.photographer} _id={photo._id} key={photo._id} />
    )

    useEffect(() => { 
        if( user !== null ) {
            getUserPhotos(user) }
        }, []);

    return (
        <article className="gallery" >
            <h2>Gallery</h2>
            <div className="grid-container">
                {renderedPhotos}
            </div>
            <Link to='camera'><button>Camera</button></Link>
        </article>
    )
}

export default Gallery;