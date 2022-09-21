import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchUserPhotos } from "../../methods/fetchFunctions";
import { photoObj } from "../../models/DataObjects";
import GalleryPhoto from "./GalleryPhoto";


const Gallery = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('loggedIn');
    const [galleryPhotos, setGalleryPhotos] = useState<ReactElement[]>();

    const renderUserPhotos = async () => {
        const userPhotos: photoObj[] = await fetchUserPhotos(user);
        const renderedPhotos = userPhotos.map(photo => < GalleryPhoto url={photo.url} photographer={photo.photographer}/>)
        setGalleryPhotos(renderedPhotos);
    };

    useEffect(() => {renderUserPhotos()}, []);

    return (
        <article className="gallery" >
            <h2>Gallery</h2>
            <div className="grid-container">
                {galleryPhotos}
            </div>
            <Link to='camera'><button>Camera</button></Link>
        </article>
    )
}

export default Gallery;