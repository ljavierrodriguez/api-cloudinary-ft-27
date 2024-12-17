import React from 'react'

const GalleryItem = ({ url, id, description, className }) => {
    return (
        <div className={"carousel-item " + className } >
            <img src={url} className="d-block w-100" alt="..." />
            {description && (
                <div className="carousel-caption d-none d-md-block">
                    <h5>Image {id}</h5>
                    <p>{description}</p>
                </div>
            )}
        </div>
    )
}

export default GalleryItem