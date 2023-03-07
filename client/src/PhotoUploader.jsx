import axios from "axios";
import { useState } from "react";


export default function PhotoUploader({addedPhotos,onChange}) {

    const [photoLink, setPhotoLink] = useState('')

    async function addPhotoByLink(e){
        e.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link',{link: photoLink})
        onChange(prev => {
            return [...prev,filename]
        })
        setPhotoLink('')
    }
    async function uploadPhoto(e){
        const files = e.target.files
        const data = new FormData()
        for(let i = 0; i < files.length; i++){
            data.append('photos',files[i])
        }
        
        axios.post('/upload',data,{
            headers:{"Content-type":"multipart/form-data"}
        }).then(response => {
            const {data:filenames} = response
            console.log(data)
            onChange(prev => {
                return [...prev,...filenames]
            })
        })
    }
    return (
        <>
            <div className="flex gap-2">
                <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using link .jpg" />
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 gap-2 rounded-2xl ">Add&nbsp;photo</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex ">
                        <img className="rounded-2xl w-full object-cover position-center" src={"http://localhost:3000/uploads/" + link} alt="" />
                    </div>
                ))}
                <label className="h-32 border cursor-pointer bg-transparent flex justify-center gap-3 rounded-2xl items-center text-xl" >
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    )
}
