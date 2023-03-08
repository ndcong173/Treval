import axios from "axios"
import { useEffect, useState } from "react"

export default function IndexPage(){

  const [places, setPlaces] = useState([])

  useEffect(()=>{
    axios.get('/places').then(response=>{
      setPlaces(response.data)
    })
  }, [])
    return(
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 && places.map(place =>(
        <div>
          <div className=" rounded-2xl flex mb-2">
            {place.photos?.[0] && (
              <img className=" rounded-2xl aspect-square object-cover" src={'http://localhost:3000/uploads/'+place.photos[0]} alt="" />
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold text-xl text-primary">${place.price}</span>
            /night
          </div>
        </div>
      ))}
    </div>
    )
}