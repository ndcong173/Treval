import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";

export default function PlacesPage() {

    const { action } = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuest, setMaxGuest] = useState(1)

    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
    async function addPhotoByLink(e){
        e.preventDefault()
        const {data:filename} = await axios.post('/upload-by-link',{link: photoLink})
        setAddedPhotos(prev => {
            return [...prev,filename]
        })
        setPhotoLink('')
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center">
                    <Link className="bg-primary inline-flex gap-2 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new places
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>
                        {preInput('Title', 'Title for your place.Should be short and cachy in advertisement')}
                        <input type={"text"} value={title} onChange={e => setTitle(e.target.value)} placeholder={"Title, for example: My lovely apartment"} />
                        {preInput('Address', 'Your place s address')}
                        <input type={"text"} value={address} onChange={e => setAddress(e.target.value)} placeholder={"Address"} />
                        {preInput('Photo', 'More is better')}
                        <div className="flex gap-2">
                            <input type="text" value={photoLink} onChange={e => setPhotoLink(e.target.value)} placeholder="Add using link .jpg" />
                            <button onClick={addPhotoByLink} className="bg-gray-200 px-4 gap-2 rounded-2xl ">Add&nbsp;photo</button>
                        </div>
                        <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div>
                                    <img className="rounded-2xl" src={"http://localhost:3000/uploads/"+link} alt="" />
                                </div>
                            ))}
                            <button className="border bg-transparent flex justify-center gap-3 rounded-2xl items-center text-xl" >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                                </svg>
                                Upload
                            </button>
                        </div>
                        {preInput('Description', 'Description of the place')}
                        <textarea value={description} onChange={e => setDescription(e.target.value)} />
                        {preInput('Perks', 'Select all the perks of your place')}
                        <div className="grid gap-2 mt-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <Perks seclected={perks} onChange={setPerks} />
                        </div>
                        {preInput('Extra infomation', 'Policy, house rules, etc.')}
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                        {preInput('Check in & out time', 'Add check in & out time')}
                        <div className="grid gap-2 sm:grid-cols-3">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max guest</h3>
                                <input type="number" value={maxGuest} onChange={e => setMaxGuest(e.target.value)} placeholder="" />
                            </div>
                        </div>
                        <div>
                            <button className="primary my-4">save</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}