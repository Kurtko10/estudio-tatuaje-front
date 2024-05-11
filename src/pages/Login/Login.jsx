// import React,{useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
// //import { useDispatch } from "react-redux";
// import { loginCall } from "../../service/apiCalls";
// import { inputValidator } from "../../utils/validator";
// import { decodeToken } from "react-jwt";
// import {CustomInput} from "../../components/CusstomInput/CustomInput";
// import { ButtonC } from "../../components/ButtonC/ButtonC";
// import SocialIcons from "../../components/SocialIcons/SocialIcons";
// import Button from "../../components/ButtonCita/ButtonCita";

// import "./Login.css";


// export const Login = () => {

//     const navigate = useNavigate();

//     const [credentials, setCredentials] = useState({
//         email: "",
//         password:""
//     });

//     const[isValidContent, setIsValidContent] = useState({
//         email: "",
//         password:""
//     })

//     //const [loginError, setLoginError] = useState("")
//     const [msg, setMsg] = useState("");

//     //const dispatch = useDispatch();

//     const inputHandler =(e) =>{
//         setCredentials((prevState) =>({
//             ...prevState,
//             [e.target.name]:e.target.value,
//         }));
//     };

//     const inputValidatorHandler = (e) => {
//         const errorMessage = inputValidator (e.target.value, e.target.name);
//         setIsValidContent((prevState) => ({
//             ...prevState,
//             [e.target.name]: errorMessage,
//         }));
//     };

//     const handleLogin = async () => {
//         try {
//           const isFormValid = Object.values(isValidContent).every(error => !error);
//           if (!isFormValid) {
//             return;
//           }
    
//           const answer = await loginCall(credentials);
//           if (answer.data.token) {
//             const uDecodificado = decodeToken(answer.data.token);
//             const passport = {
//               token: answer.data.token,
//               decodificado: uDecodificado,
//             };
    
//             sessionStorage.setItem("passport", JSON.stringify(passport));
//             setMsg(`${uDecodificado.userName}, bienvenid@ de nuevo.`);
    
//             setTimeout(() => {
//               navigate("/");
//             }, 3000);
//           }
//         } catch (error) {
//           console.log(error);
//         }
//       };

//     return (
//         <div className="login-container loginElementsDesign d-flex justify-content-center align-items-center">
//           <h3 className="titleLogin">Ingesa tus credenciales</h3>
//           <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
//           <Button className="button-cita" text="<  Pedir Cita  >" />
//           {msg === "" ? (
//               <>
//               <CustomInput
//                 typeProp={"email"}
//                 nameProp={"email"}
//                 handlerProp={(e) => inputHandler(e)}
//                 placeholderProp={"escribe tu e-mail"}
//                 onBlurHandler={(e) => inputValidatorHandler(e)}
//                 errorText={isValidContent.email}
//                 disableValidation={false}
//               />
//               <CustomInput
//                 typeProp={"password"}
//                 nameProp={"password"}
//                 handlerProp={(e) => inputHandler(e)}
//                 placeholderProp={"escribe el password"}
//                 onBlurHandler={(e) => inputValidatorHandler(e)}
//               />
//               <ButtonC
//                 title={"log me!"}
//                 className={"regularButtonClass"}
//                 functionEmit={handleLogin}
//               />
//             </>
//           ) : (
//             <div className="msg-welcome">{msg}</div>
//           )}
//         </div>
//       );
// }
// export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Importa useDispatch para despachar acciones
import { login } from "../../app/slices/userSlice"; // Importa la acción de inicio de sesión
import { decodeToken } from "react-jwt";
import { loginCall } from "../../service/apiCalls";
import {useNavigate} from "react-router-dom";
import { CustomInput } from "../../components/CusstomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import Button from "../../components/ButtonCita/ButtonCita";
import SocialIcons from "../../components/SocialIcons/SocialIcons";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch(); // Obtiene la función dispatch del store Redux
  const navigate = useNavigate();  
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const [isValidContent, setIsValidContent] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

     const inputValidatorHandler = (e) => {
        const errorMessage = inputValidator (e.target.value, e.target.name);
        setIsValidContent((prevState) => ({
            ...prevState,
            [e.target.name]: errorMessage,
        }));
    };

  const handleLogin = async () => {
    try {
      // Lógica de validación y llamada de API para iniciar sesión
      const answer = await loginCall(credentials);
      if (answer.data.token) {
        const uDecodificado = decodeToken(answer.data.token);
        dispatch(login({ token: answer.data.token, decodificado: uDecodificado })); // Dispatch de la acción de inicio de sesión
        setMsg(`${uDecodificado.userName}, bienvenid@ de nuevo.`);
        setTimeout(() => {
          navigate("/");
          console.log(uDecodificado);
          console.log("Token:", answer.data.token);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container loginElementsDesign d-flex justify-content-center align-items-center">
      <h3 className="titleLogin">Ingesa tus credenciales</h3>
      <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
      <Button className="button-cita" text="<  Pedir Cita  >" />
      {msg === "" ? (
        <>
          <CustomInput
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe tu e-mail"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.email}
            disableValidation={false}
          />
          <CustomInput
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe el password"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
          />
          <ButtonC
            title={"log me!"}
            className={"regularButtonClass"}
            functionEmit={handleLogin}
          />
        </>
      ) : (
        <div className="msg-welcome">{msg}</div>
      )}
    </div>
  );
};

export default Login;
