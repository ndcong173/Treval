import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/bookings", {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-gray-900 p-4 rounded-2xl shadow-xl">
      <div className="text-xl text-center text-gray-300">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 text-2xl font-bold">
          $ {place.price}
        </span>{" "}
        / night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="px-3 py-4">
            <label className="text-gray-300">Check In: </label>
            <DatePicker
              className="bg-gray-800 text-gray-300 border-none"
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              minDate={moment().toDate()}
            />
          </div>
          <div className="px-3 py-4 border-l">
            <label className="text-gray-300">Check Out: </label>
            {/* <input
                            type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)} /> */}
            <DatePicker
              className="bg-gray-800 text-gray-300 border-none"
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              minDate={moment().toDate()}
            />
          </div>
        </div>
        <div>
          <div className="px-3 py-4 border-t">
            <label className=" text-gray-300">Number of guests: </label>
            <input
              className="bg-gray-800 text-gray-300 appearance-none border-no"
              min="1"
              type="number"
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
          {numberOfNights <= 0 && (
            <p className=" text-xs mx-3 text-red-600 mb-3 -mt-3">
              Please select valid check in and check out date!
            </p>
          )}
          {numberOfNights > 0 && (
            <div className="px-3 py-4 border-t">
              <label>Your fullname: </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Your phone number: </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={bookThisPlace}
        className="primary bg-gradient-to-r from-purple-500 to-pink-500 mt-4"
      >
        Book this place
        {numberOfNights > 0 && <span> for {numberOfNights} nights (${numberOfNights * place.price})</span>}

      </button>
    </div>
  );
}
