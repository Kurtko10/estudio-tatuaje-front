// import React, { useState } from "react";
// import { useDispatch } from "react-redux"; // Importa useDispatch para despachar acciones
// import { login } from "../../app/slices/userSlice"; // Importa la acción de inicio de sesión
// import { decodeToken } from "react-jwt";
// import { loginCall } from "../../service/apiCalls";
// import {useNavigate} from "react-router-dom";
// import { CustomInput } from "../../components/CusstomInput/CustomInput";
// import { ButtonC } from "../../components/ButtonC/ButtonC";
// import Button from "../../components/ButtonCita/ButtonCita";
// import SocialIcons from "../../components/SocialIcons/SocialIcons";

// import "./Login.css";

// const Login = () => {
//   const dispatch = useDispatch(); // Obtiene la función dispatch del store Redux
//   const navigate = useNavigate();  
//   const [credentials, setCredentials] = useState({
//     email: "",
//     password: ""
//   });

//   const [isValidContent, setIsValidContent] = useState({
//     email: "",
//     password: ""
//   });

//   const [msg, setMsg] = useState("");

//   const inputHandler = (e) => {
//     setCredentials((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//      const inputValidatorHandler = (e) => {
//         const errorMessage = inputValidator (e.target.value, e.target.name);
//         setIsValidContent((prevState) => ({
//             ...prevState,
//             [e.target.name]: errorMessage,
//         }));
//     };

//   const handleLogin = async () => {
//     try {
      
//       const answer = await loginCall(credentials);
//       if (answer.data.token) {
//         const uDecodificado = decodeToken(answer.data.token);
//         dispatch(login({ token: answer.data.token, decodificado: uDecodificado })); 
//         setMsg(`${uDecodificado.userName}, bienvenid@ de nuevo.`);

//         if (uDecodificado.userRole === "admin") {
//           // Redirigir al usuario a la vista de administrador
//           console.log(uDecodificado.userRole);
//           navigate("/admin");
//         } else {
//           // Redirigir al usuario a su perfil u otra vista
//           setTimeout(() => {
//             navigate("/profile");
//             console.log(uDecodificado);
//             console.log("Token:", answer.data.token);
//           }, 3000);
//         }
//         }

      
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="login-container loginElementsDesign d-flex justify-content-center align-items-center">
//       <h3 className="titleLogin">Ingresa tus credenciales</h3>
//       <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
//       <Button className="button-cita" text="<  Pedir Cita  >" />
//       {msg === "" ? (
//         <>
//           <CustomInput
//             typeProp={"email"}
//             nameProp={"email"}
//             handlerProp={(e) => inputHandler(e)}
//             placeholderProp={"escribe tu e-mail"}
//             onBlur={(e) => inputValidatorHandler(e)}
//             errorText={isValidContent.email}
//             disableValidation={false}
//           />
//           <CustomInput
//             typeProp={"password"}
//             nameProp={"password"}
//             handlerProp={(e) => inputHandler(e)}
//             placeholderProp={"escribe el password"}
//             onBlur={(e) => inputValidatorHandler(e)}
//           />
//           <ButtonC
//             title={"Login!!"}
//             className={"regularButtonClass"}
//             onClick={handleLogin}
//           />
//         </>
//       ) : (
//         <div className="msg-welcome">{msg}</div>
//       )}
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Importa useDispatch para despachar acciones
import { login } from "../../app/slices/userSlice"; // Importa la acción de inicio de sesión
import { decodeToken } from "react-jwt";
import { loginCall } from "../../service/apiCalls";
import { useNavigate } from "react-router-dom";
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

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const inputValidatorHandler = (e) => {
    const errorMessage = inputValidator(e.target.value, e.target.name);
    setIsValidContent((prevState) => ({
      ...prevState,
      [e.target.name]: errorMessage,
    }));
    setTouched((prevState) => ({
      ...prevState,
      [e.target.name]: true,
    }));
  };

  const handleLogin = async () => {
    try {
      const answer = await loginCall(credentials);
      if (answer.data.token) {
        const uDecodificado = decodeToken(answer.data.token);
        dispatch(login({ token: answer.data.token, decodificado: uDecodificado })); 
        setMsg(`${uDecodificado.userName}, bienvenid@ de nuevo.`);

        if (uDecodificado.userRole === "admin") {
          // Redirigir al usuario a la vista de administrador
          navigate("/admin");
        } else {
          // Redirigir al usuario a su perfil u otra vista
          setTimeout(() => {
            navigate("/profile");
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container loginElementsDesign d-flex justify-content-center align-items-center">
      <h3 className="titleLogin">Ingresa tus credenciales</h3>
      <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
      <Button className="button-cita" text="<  Pedir Cita  >" />
      {msg === "" ? (
        <>
          <CustomInput
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={inputHandler}
            placeholderProp={"escribe tu e-mail"}
            onBlur={inputValidatorHandler}
            errorText={touched.email ? isValidContent.email : ""}
          />
          <CustomInput
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={inputHandler}
            placeholderProp={"escribe el password"}
            onBlur={inputValidatorHandler}
            errorText={touched.password ? isValidContent.password : ""}
          />
          <ButtonC
            title={"Login!!"}
            className={"regularButtonClass"}
            onClick={handleLogin}
          />
        </>
      ) : (
        <div className="msg-welcome">{msg}</div>
      )}
    </div>
  );
};

export default Login;