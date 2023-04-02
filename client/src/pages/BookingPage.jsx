import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import Gallery from "../components/Gallery";
import Dates from "../components/Dates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState();
  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }
  return (
    <div className="my-8">
      <h1 className="text-2xl ">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-xl mb-2">Reservation infomartion:</h2>
          <Dates booking={booking} />
          <div>Booking creator: {booking.user.name}</div>
          <div>Booking guest: {booking.name}</div>
          
        </div>
        <div className=" bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white rounded-2xl text-center">
          <div >Total price </div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
      <Gallery place={booking.place} />
    </div>
  );
}
