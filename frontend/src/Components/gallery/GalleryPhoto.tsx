import { ReactElement, useState } from "react";
import { deletePhoto } from "../../methods/fetchFunctions";

interface PhotoProps {
    url: string,
    photographer: string,
    _id: string | undefined,
    getUserPhotos: (user:string) => Promise<void>,  
}

const GalleryPhoto = (props: PhotoProps): ReactElement => {
    const { url, photographer, _id, getUserPhotos } = props;
    const [deleteError, setDeleteError] = useState<string>();

    const handleDelete = async () => {
        const result = await deletePhoto(_id);
        const user = sessionStorage.getItem('loggedIn');

        if (!result.success) {
            setDeleteError('Failed to delete photo.')
        }

        if (result.success && user !== null) {
            // EVENTUELLT UPPDATERA TILL deletedPhoto-state HOS GALLERY ??
            getUserPhotos(user);
        };
    };

    return (
        <section className="gallery-photo grid-item">
            <img src={url} alt={`Photo taken by ${photographer}`} />
            <p>By {photographer}</p>
            <button onClick={handleDelete}>x</button>
            <p>{deleteError}</p>
        </section>
    )
}

export default GalleryPhoto;