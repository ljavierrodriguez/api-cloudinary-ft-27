import React, { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import GalleryItem from './components/GalleryItem'
import './styles/global.css'

const App = () => {

    const [gallery, setGallery] = useState([])
    const [description, setDescription] = useState("")
    const [active, setActive] = useState(true)
    const [file, setFile] = useState(null)


    useEffect(() => {
        getGallery()
    }, [])

    const getGallery = async () => {
        try {

            const response = await fetch('http://127.0.0.1:5000/api/gallery')
            const data = await response.json()
            setGallery(data)

        } catch (error) {
            console.log(error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(active)

        const formData = new FormData()

        formData.append("description", description)
        formData.append("active", active)
        formData.append("image", file)

        uploadImage(formData)

        setFile(null)
        setDescription("")
        setActive(true)
        e.target.reset()
    }

    const uploadImage = data => {
        fetch('http://127.0.0.1:5000/api/gallery/upload', {
            method: 'POST',
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                getGallery()
                alert(data.message)
            })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Gallery>
                        {
                            gallery.length > 0 &&
                            gallery.map((img, index) => {
                                return (
                                    <GalleryItem 
                                    key={index}
                                    url={img.filename}
                                    description={img.description} 
                                    className={index===0 ? "active" : ""} />
                                )
                            })
                        }

                        {/* <GalleryItem url="https://picsum.photos/id/400/450/600" />
                        <GalleryItem url="https://picsum.photos/id/500/450/600" />
                        <GalleryItem url="https://picsum.photos/id/600/450/600" /> */}
                    </Gallery>
                </div>
                <div className="col-md-6 p-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="file" className="form-label">File</label>
                            <input className='form-control' type="file" id='file' onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" className="form-control" id="description" placeholder='Insert Description' onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="form-check form-switch mb-3">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={active} onChange={() => setActive(!active)}  />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Active</label>
                        </div>
                        <button className={"btn btn-primary btn-sm w-100 " + (!!file ? "" : "disabled")} >
                            Upload
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default App