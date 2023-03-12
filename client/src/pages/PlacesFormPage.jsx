import { useEffect, useState } from "react"
import PhotoUploader from "../PhotoUploader";
import Perks from "../Perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";


export default function PlacesFormPage() {

    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price,setPrice] = useState('')
    const [redirect,setRedirect] = useState(false)

    useEffect(()=>{
        if(!id){
            return
        }
        axios.get('/places/'+id).then(response =>{
            const {data} = response
            setTitle(data.title)
            setAddress(data.address)
            setAddedPhotos(data.photos)
            setDescription(data.description)
            setPerks(data.perks)
            setExtraInfo(data.extraInfo)
            setCheckIn(data.checkIn)
            setCheckOut(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    },[id])

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }
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
    async function savePlace(e) {
        e.preventDefault()
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        }
        if(id){
            //update
            await axios.put('/places/', {
                id,...placeData
            })
            setRedirect(true)
        }
        else{
            //add a new one
            await axios.post('/places', placeData)
            setRedirect(true)
        }  
    }

    if(redirect){
        return <Navigate to ={'/account/places'}/>
    }

    return (
        <div>
            <AccountNav/>
            <form className=" mx-28" onSubmit={savePlace}>
                {preInput('Title', 'Title for your place.Should be short and cachy in advertisement')}
                <input type={"text"} value={title} onChange={e => setTitle(e.target.value)} placeholder={"Title, for example: My lovely apartment"} />
                {preInput('Address', 'Your place s address')}
                <input type={"text"} value={address} onChange={e => setAddress(e.target.value)} placeholder={"Address"} />
                {preInput('Photo', 'More is better')}
                <PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
                {preInput('Description', 'Description of the place')}
                <textarea 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} />
                {preInput('Perks', 'Select all the perks of your place')}
                <div className="grid gap-2 mt-2 grid-cols-1 lg:grid-cols-2">
                    <Perks seclected={perks} onChange={setPerks} />
                </div>
                {preInput('Extra infomation', 'Policy, house rules, etc.')}
                <textarea 
                    className="resize"
                    value={extraInfo} 
                    onChange={e => setExtraInfo(e.target.value)} />
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
                        <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} placeholder="" />
                    </div>
                </div>
                {preInput('Price', 'per night')}
                <input type={"text"} value={price} onChange={e => setPrice(e.target.value)} placeholder={"Price/night"} />
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    )
}