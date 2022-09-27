import { ReactElement, useState } from "react";
import { deletePhoto } from "../../methods/fetchFunctions";
import styles from './GalleryPhoto.module.css';
import deleteSvg from '../svgs/delete-icon.svg';

// TypeScript interface to handle props
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

    // DELETE PHOTO
    const handleDelete = async (): Promise<void> => {
        // await result success of delete request
        const { success } = await deletePhoto(_id);
        const user: string | null = sessionStorage.getItem('loggedIn');

        // if delete was unsuccessful, display error message
        if (!success) {
            setDeleteError('Failed to delete photo.')
        }

        // if successfull and user is logged in, get user photos and re-render gallery
        if (success && user !== null) {
            getUserPhotos(user);
        };
    };

    return (
        <section className={gridItem}>
            <img className={deleteIcon} src={deleteSvg} onClick={handleDelete} />
            <img className={img} src={url} alt={`Photograph by ${photographer}`} />
            <p style={{color: "red"}}>{deleteError}</p>
        </section>
    )
}

export default GalleryPhoto;