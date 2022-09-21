import { ReactElement } from "react";
import { deletePhoto, fetchUserPhotos } from "../../methods/fetchFunctions";
import { photoObj } from "../../models/DataObjects";

interface PhotoProps {
    url: string,
    photographer: string,
    _id: string | undefined,
    setPhotoObjects: React.Dispatch<React.SetStateAction<photoObj[] | undefined>>,
}

const GalleryPhoto = (props: PhotoProps): ReactElement => {
    const { url, photographer, _id, setPhotoObjects } = props;

    const handleDelete = async () => {
        const result = await deletePhoto(_id);
        if (result.success) {
            const user = sessionStorage.getItem('loggedIn');
            const userPhotos = await fetchUserPhotos(user);
            setPhotoObjects(userPhotos);
        };
    };

    return (
        <section className="gallery-photo grid-item">
            <img src={url} alt={`Photo taken by ${photographer}`} />
            <p>By {photographer}</p>
            <button onClick={handleDelete}>x</button>
        </section>
    )
}

export default GalleryPhoto;