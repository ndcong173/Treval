import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";

export default function PlacesPage() {

    return (
        <div>
            <AccountNav/>
                <div className="text-center">
                    <Link className="bg-primary inline-flex gap-2 text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new places
                    </Link>
                </div>
        </div>
    )
}