import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { photoObj } from "../../models/DataObjects";
import GalleryPhoto from "./GalleryPhoto";


const Gallery = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('loggedIn');
    const [galleryPhotos, setGalleryPhotos] = useState<ReactElement[]>();

    const fetchUserPhotos = async () => {
        console.log('Gallery SessionStorage User: ', user);

        const response = await fetch('http://localhost:1337/gallery', {
            method: "GET",
            headers: { "Authorization": `Bearer ${user}` },
        });

        const result = await response.json();

        const data = result.data;

        console.log('USER PHOTOS: ', data);

        return data;
    }

    const renderUserPhotos = async () => {
        const userPhotos: photoObj[] = await fetchUserPhotos();
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