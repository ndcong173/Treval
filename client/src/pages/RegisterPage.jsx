import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("")
  const [redirect, setRedirect] = useState(false)

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
        role
      });
      alert("Welcome to Treval! Log in and enjoy now!")
      setRedirect(true)
    } catch (error) {
      alert("Your email is already registed. Please try again")
    }
  }

  if(redirect){
    return <Navigate to={'/login'}/>
  }

  return (
    <div className="mt-4 flex grow items-center justify-around text-gray-300">
      <div className="mb-16">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className=" max-w-md mx-auto" onSubmit={registerUser}>
        <ul class="grid w-full gap-6 md:grid-cols-2 my-2">
            <li>
              <input
                type="radio"
                id="guest"
                name="hosting"
                value="guest"
                className="hidden peer"
                onChange={e => setRole(e.target.value)}
                required
              />
              <label
                for="guest"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-gray-800 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-pink-500 peer-checked:text-pink-500 hover:text-pink-500 hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">Guest</div>
                  <div className="w-full">You want to rent a place</div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="owner"
                name="hosting"
                value="owner"
                className="hidden peer"
                onChange={e => setRole(e.target.value)}
              />
              <label
                for="owner"
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-gray-800 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-pink-500 peer-checked:text-pink-500 hover:text-pink-500 hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">Owner</div>
                  <div className="w-full">You want to rent out accommodation</div>
                </div>
              </label>
            </li>
          </ul>
          <input
            className="bg-gray-800 border-none my-2"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-gray-800 border-none my-2"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-gray-800 border-none my-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary bg-gradient-to-r from-purple-500 to-pink-500 mt-2">Register</button>
          <div className="text-center py-2">
            Already have account! 
            <Link className="underline bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500" to={"/login"}>
              Log in now!
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
}
