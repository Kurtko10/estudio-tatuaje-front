import {Navigate, Route, Routes} from "react-router-dom";
import { Home } from "../Home/Home"


import "./Body.css"


//-----------------------


export const Body = () =>{


    
    return(
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home />}/>




            </Routes>
        </>

    )
}
