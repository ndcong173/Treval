import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)
    async function handleLogin(e){
        e.preventDefault()
        try {
            const {data}= await axios.post('/login',{email,password})
            setUser(data)
            alert('Login success')
            setRedirect(true)
        } catch (error) {
            alert('login fail')
        }      
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <div className="mt-4 flex grow items-center justify-around">
            <div className="mb-16">
                <h1 className="text-4xl text-center mb-4" >Login</h1>
                <form className=" max-w-md mx-auto" onSubmit={handleLogin}>
                    <input 
                        type="email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={e=> setEmail(e.target.value)}/>
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e=> setPassword(e.target.value)}/>    
                    <button className="primary">Login</button>
                    <div className="text-center py-2">
                        Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now!</Link>
                    </div>                    
                </form>  
            </div>  
        </div>
    )
}