import axios from "axios";
import { useState } from "react";


export default function PhotoUploader({ addedPhotos, onChange }) {

    const [photoLink, setPhotoLink] = useState('')

    async function addPhotoByLink(e) {
        e.preventDefault()
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
        onChange(prev => {
            return [...prev, filename]
        })
        setPhotoLink('')
    }
    async function uploadPhoto(e) {
        const files = e.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }

        axios.post('/upload', data, {
            headers: { "Content-type": "multipart/form-data" }
        }).then(response => {
            const { data: filenames } = response
            console.log(data)
            onChange(prev => {
                return [...prev, ...filenames]
            })
        })

    }
    function removePhoto(e,filename) {
        e.preventDefault()
        onChange([...addedPhotos.filter(photo => photo !== filename)])
    }
    function selectMainPhoto(e,filename){
        e.preventDefault()
        onChange([filename, ...addedPhotos.filter(photo => photo !== filename)])
    }
    return (
        <>
            <div className="flex gap-2">
                <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using link .jpg" />
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 gap-2 rounded-2xl ">Add&nbsp;photo</button>
            </div>
            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map(link => (
                    <div className="h-32 flex relative">
                        <img className="rounded-2xl w-full object-cover position-center" src={"http://localhost:3000/uploads/" + link} alt="" />
                        <button onClick={e => removePhoto(e,link)} className=" absolute bottom-1 right-1 text-white transition-all delay-100 cursor-pointer hover:text-red-500 bg-opacity-50 rounded-2xl bg-black py-2 px-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                        </button>
                        <button onClick={e => selectMainPhoto(e,link)} className=" absolute bottom-1 left-1 text-white transition-all delay-100 cursor-pointer hover:text-yellow-300 bg-opacity-50 rounded-2xl bg-black py-2 px-3">
                        {link === addedPhotos[0] && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        )}
                        {link !== addedPhotos[0] && (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                        )}
                        </button>
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
