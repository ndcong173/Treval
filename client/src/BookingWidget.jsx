import axios from "axios"
import { differenceInCalendarDays } from "date-fns"
import { useContext, useEffect, useState } from "react"
import {Navigate} from "react-router-dom"
import {UserContext} from "./UserContext"
export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect,setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
          checkIn,checkOut,numberOfGuests,name,mobile,
          place:place._id,
          price:numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
      }
    
      if (redirect) {
        return <Navigate to={redirect} />
      }

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <div className="text-xl text-center"><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold">$ {place.price}</span> / night</div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="px-3 py-4">
                        <label>Check In: </label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)} />
                    </div>
                    <div className="px-3 py-4 border-l">
                        <label>Check Out: </label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div className="px-3 py-4 border-t">
                        <label>Number of guests: </label>
                        <input
                            type="number"
                            value={numberOfGuests}
                            onChange={e => setNumberOfGuests(e.target.value)} />
                    </div>
                    {numberOfNights > 0 && (
                        <div className="px-3 py-4 border-t">
                            <label>Your fullname: </label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                            <label>Your phone number: </label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={e => setMobile(e.target.value)} />
                        </div>
                    )}
                </div>
            </div>
            <button onClick={bookThisPlace} className="primary bg-gradient-to-r from-purple-500 to-pink-500 mt-4">
                Book this place
                {numberOfNights > 0 && (
                    <span>
                       (${numberOfNights * place.price})
                    </span>
                )}
            </button>
        </div>
    )
}
