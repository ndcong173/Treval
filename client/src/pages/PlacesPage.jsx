import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {

    const [places, setPlaces] = useState([])

    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data)
        })
    }, [])

    return (
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="bg-gradient-to-r from-purple-500 to-pink-500 inline-flex gap-2 text-white py-2 px-6 rounded-full shadow shadow-xl" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new places
                </Link>
            </div>
            <div className="mt-4">
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/'+place._id} className="bg-gray-100 gap-4 flex p-4 mb-2 rounded-2xl cursor-pointer"> 
                        <div className=" flex w-32 h-32 grow shrink-0">
                            <PlaceImg place={place}/>
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl ">{place.title}</h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}