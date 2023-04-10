import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget";
import Gallery from "../components/Gallery";
import AddressLink from "../components/AddressLink";

export default function PlacePage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    

    return (
        <div className="my-8 bg-gray-800 -mx-8 px-8 pt-8 rounded-3xl">
            <h1 className="text-2xl text-gray-300">{place.title}</h1>
            <AddressLink >{place.address}</AddressLink>
            <Gallery place={place}/>
            <div className=" mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] ">
                <div className="p-4 bg-gray-900 rounded-2xl shadow-xl text-gray-300">
                    <div className="text-gray-300">
                        <h2 className=" font-semibold text-2xl">Description</h2>
                        {place.description}
                    </div>
                    Check-in: {place.checkIn}  <br />
                    Check-out: {place.checkOut} <br />
                    Maximum number of guests: {place.maxGuests}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-4 mb-8 shadow-xl">
                <div>
                    <h2 className=" font-semibold text-2xl text-gray-300">Extra information</h2>
                </div>
                <div className="mb-4 mt-1 text-sm text-gray-500 leading-5">
                    {place.extraInfo}
                </div>
            </div>
            
        </div>
    )
}
