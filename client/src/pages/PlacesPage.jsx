import { Link, useParams } from "react-router-dom";

export default function PlacesPage() {

    const {action} = useParams()

    return (
        <div>
            {action !== 'new' &&(
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
                        <h2 className="text-2xl mt-2">Title</h2>
                        <p className="text-gray-500 text-sm">Title for your place.Should be short and cachy in advertisement</p>
                        <input type={"text"} placeholder={"Title, for example: My lovely apartment"}/>
                        <h2 className="text-2xl mt-2">Address</h2>
                        <p className="text-gray-500 text-sm">Your place's address</p>            
                        <input type={"text"} placeholder={"Address"}/>
                        <h2 className="text-2xl mt-2">Photo</h2>
                        <p className="text-gray-500 text-sm">More is better</p>
                        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            <button className="border bg-transparent rounded-2xl p-8 text-xl">+</button>
                        </div>                                  
                    </form>
                </div>
            )}
        </div>
    )
}