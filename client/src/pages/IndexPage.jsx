import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function IndexPage() {

  const [places, setPlaces] = useState([])

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces([...response.data, ...response.data, ...response.data])
    })
  }, [])

  
  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id}>
          <div className=" rounded-2xl flex mb-2">
            {place.photos?.[0] && (
              <img className=" rounded-2xl aspect-square object-cover" src={'http://localhost:3000/uploads/' + place.photos[0]} alt="" />
            )}
          </div>
          <h2 className="font-bold text-gray-300">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1 text-gray-300">
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">${place.price}</span>
            /night
          </div>
        </Link>
      ))}
    </div>
  )
}
