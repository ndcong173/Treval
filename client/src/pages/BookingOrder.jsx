import axios from 'axios';
import { useState, useEffect } from 'react';
import AccountNav from '../components/AccountNav';
import Dates from '../components/Dates';

export default function BookingOrder() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/booking-place').then(response => {
        setBookings(response.data)
    })
}, [])

  return (
    <div >
        <AccountNav />
        {bookings.length > 0 && bookings.map(booking =>(
            <div className='bg-gray-800 my-4 p-4 rounded-2xl text-gray-300'>
                <h1 className='text-xl font-bold'>{booking.place.title}</h1>
                <div className='text-sm text-gray-500'>{booking.place.address}</div>
                <div>Booking creator: {booking.user.name}</div>
                <div>Guest: {booking.name}</div>
                <Dates booking={booking}/>
                <div>Total:$ {booking.price}</div>
            </div>
        ))}
    </div>
  );
}