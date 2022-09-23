import { ReactElement, useState } from "react";
import { deletePhoto } from "../../methods/fetchFunctions";
import styles from './GalleryPhoto.module.css';
import deleteSvg from './delete-icon.svg';

interface PhotoProps {
    url: string,
    photographer: string,
    _id: string | undefined,
    getUserPhotos: (user:string) => Promise<void>,
}

const GalleryPhoto = (props: PhotoProps): ReactElement => {
    const { url, photographer, _id, getUserPhotos } = props;
    const { gridItem, deleteIcon, img} = styles;
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
        <section className={gridItem}>
            <img className={deleteIcon} src={deleteSvg} onClick={handleDelete} />
            <img className={img} src={url} alt={`Photo taken by ${photographer}`} />
        </section>
    )
}

export default GalleryPhoto;