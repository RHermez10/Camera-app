import { ReactElement, useEffect, useState } from "react";
import { fetchUserPhotos } from "../../methods/fetchFunctions";
import { PhotoObj } from "../../models/DataObjects";
import GalleryPhoto from "./GalleryPhoto";
import styles from './Gallery.module.css';


const Gallery = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('loggedIn');
    const [photoObjects, setPhotoObjects] = useState<PhotoObj[]>();

    const getUserPhotos = async (user: string): Promise<void> => {
        const userPhotos: PhotoObj[] = await fetchUserPhotos(user);
        setPhotoObjects(userPhotos);
    };

    const renderedPhotos: JSX.Element[] | undefined = photoObjects?.map(photo =>
        < GalleryPhoto getUserPhotos={getUserPhotos} url={photo.url} photographer={photo.photographer} _id={photo._id} key={photo._id} />
    )

    useEffect((): void => { 
        if( user !== null ) {
            getUserPhotos(user) }
        }, []);

    return (
        <article className="gallery" >
            <div className={styles.gridContainer}>
                {renderedPhotos}
            </div>
            
        </article>
    )
}

export default Gallery;