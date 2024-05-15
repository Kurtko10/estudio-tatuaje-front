import {Navigate, Route, Routes} from "react-router-dom";
import { Home } from "../Home/Home"
import Login from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Artists } from "../Artists/Artists";
import { Users } from "../Users/Users";
import  Admin  from "../Admin/Admin";
import Appointments from "../Appointments/Appointments";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";


import "./Body.css"
import 'bootstrap/dist/css/bootstrap.min.css';


//-----------------------


export const Body = () =>{


    
    return(
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/"/>}/>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/artists" element={<Artists />} />
                <Route path="/users" element={<Users />} />
                <Route path="/appointments" element={<Appointments />} />


                <Route path="/admin" element={<AdminRoute Component={Admin} />} />


            </Routes>
        </>

    )
}
