import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout(){
    return(
        <div className="flex flex-col min-h-screen mx-auto">
            <Header />
            <div className="grid grid-cols-[1fr_4fr_1fr]">
                <div></div>
                <Outlet />
                <div></div>
            </div>
        </div>
    )
}