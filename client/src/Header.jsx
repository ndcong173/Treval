import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {

  const { user } = useContext(UserContext)

  return (
    <header className='py-4 px-8 bg-white shadow-md flex justify-between'>
      <Link to={'/'} className="flex gap-2">
        <div className="w-10">
          <img src="/navigation-icon (1).png" className=" object-fill" />
        </div>
        <span className='font-serif p-1 text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500'>Treval</span>
      </Link>
      <div className='flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300'>
        <div>Anywhere</div>
        <div className='border-l border-gray-300'></div>
        <div>Any Week</div>
        <div className='border-l border-gray-300'></div>
        <div>Any guests</div>
        <button className='bg-transparent'>
          <img className="w-7 " src="/search.png" alt="" />
        </button>
      </div>
      <Link to={user ? '/account' : '/login'} className='flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className='bg-gray-500 text-white rounded-full p-1 border border-gray-500 overflow-hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
        {!!user && (
          <div>
            {user.name}
          </div>
        )}
      </Link>
    </header>
  );
}