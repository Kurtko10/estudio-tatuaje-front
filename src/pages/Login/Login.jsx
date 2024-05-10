import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CustomInput} from "../../components/CusstomInput/CustomInput";
import { decodeToken } from "react-jwt";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import Button from "../../components/ButtonCita/ButtonCita";

import "./Login.css";


export const Login = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password:""
    });

    const inputHandler =(e) =>{
        setCredentials((prevState) =>({
            ...prevState,
            [e.target.name]:e.target.value,
        }));
    };

    




    return (

        <div className="login-container">
        
            </div>

    )
}
export default Login;