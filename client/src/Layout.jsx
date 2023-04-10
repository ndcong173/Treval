import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Layout(){
    return(
        <div className="flex flex-col min-h-screen mx-auto bg-gray-900">
            <Header />
            <div className="grid grid-cols-[1fr_3fr_1fr]">
                <div></div>
                <Outlet />
                <div></div>
            </div>
        </div>
    )
}