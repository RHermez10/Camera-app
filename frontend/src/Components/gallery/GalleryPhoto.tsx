import { ReactElement } from "react";
import { photoObj } from "../../models/DataObjects";

const GalleryPhoto = (props: photoObj): ReactElement => {
    const {url, photographer} = props;

    return (
        <section className="gallery-photo grid-item">
            <img src={url} alt={`Photo taken by ${photographer}`} />
            <p>By {photographer}</p>
        </section>
    )
}

export default GalleryPhoto;