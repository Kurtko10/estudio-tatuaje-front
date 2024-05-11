// import { useNavigate } from "react-router-dom";
// import { CustomInput } from "../../components/CusstomInput/CustomInput";
// import { ButtonC } from "../../components/ButtonC/ButtonC";
// import { useEffect, useState } from "react";
// import { decodeToken } from "react-jwt";
// import { registerNewUserCall } from "../../service/apiCalls";
// import { inputValidator } from "../../utils/validator";

// import "./Register.css";

// export const Register = () => {
//   const navigate = useNavigate();

//   const [credentials, setCredentials] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     provincia: "",
//     isActive: true, // Valor predeterminado
//   });
//   const [isValidContent, setIsValidContent] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     provincia: "",
//     email: "",
//     password: ""
//   });
  

//   const [msg, setMsg] = useState("");

//   const inputHandler = (e) => {
//     setCredentials((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
  
//     // Verificar la coincidencia de la confirmación de la contraseña 
//     if (e.target.name === "confirmPassword") {
//       validatePasswordConfirmation(e.target.value);
//     } else {
//       setIsValidContent((prevState) => ({
//         ...prevState,
//         confirmPassword: "", 
//       }));
//     }
//   };

//   const validatePasswordConfirmation = (confirmPassword) => {
//     if (confirmPassword !== credentials.password) {
//       setIsValidContent((prevState) => ({
//         ...prevState,
//         confirmPassword: "Las contraseñas no coinciden",
//       }));
//     } else {
//       setIsValidContent((prevState) => ({
//         ...prevState,
//         confirmPassword: "", 
//       }));
//     }
//   };

//   const registerMe = async () => {
//     const { firstName, lastName, phone, provincia, email, password } = credentials;
  
//     const isValid = {
//       firstName: inputValidator(firstName, "name", "firstName"), 
//       lastName: inputValidator(lastName, "name", "lastName"), 
//       phone: inputValidator(phone, "phone", "phone"), 
//       provincia: inputValidator(provincia, "provincia", "provincia"), 
//       email: inputValidator(email, "email", "email"), 
//       password: inputValidator(password, "password", "password") 
//     };
  
//     setIsValidContent(isValid);
  
//     const allValid = Object.values(isValid).every((val) => val === "");
  
//     if (allValid) {
//       try {
//         const answer = await registerNewUserCall(credentials);
//         setMsg(""); // Limpiar el mensaje si no hay error
//         navigate("/login");
//         console.log("vamos a login");
//       } catch (error) {
//         console.log("Error al registrar el usuario:", error.response.data.message);
//         setMsg("Error al registrar el usuario ");
//         setCredentials({
//           firstName: "",
//           lastName: "",
//           email: "",
//           phone: "",
//           password: "",
//           provincia: "",
//           isActive: true,
//         });
//         setIsValidContent({
//           firstName: "",
//           lastName: "",
//           phone: "",
//           provincia: "",
//           email: "",
//           password: ""
//         });
        
//         setTimeout(() => {
//           setMsg("");
//         }, 4000);
//       }
//     } else {
//       console.log("Credenciales incorrectas, algún campo no está bien introducido");
//     }
//     console.log(credentials);
//   };
  
//   return (
//     <div className="register-container registerElementsDesign d-flex justify-content-center align-items-center">
//       <h3 className="titleRegister">Ingresa tus datos</h3>
//     {msg === "" ? (
//       <>
//         <CustomInput
//           typeProp={"text"}
//           nameProp={"firstName"}
//           handlerProp={(e) => inputHandler(e)}
//           placeholderProp={"Escribe tu nombre"}
//           onBlurHandler={(e) => inputValidatorHandler(e)}
//           errorText={isValidContent.firstName}
//         />
//         <CustomInput
//           typeProp={"text"}
//           nameProp={"lastName"}
//           handlerProp={(e) => inputHandler(e)}
//           placeholderProp={"Escribe tu apellido"}
//           onBlurHandler={(e) => inputValidatorHandler(e)}
//           errorText={isValidContent.lastName}
//         />
//         <CustomInput
//           typeProp={"text"}
//           nameProp={"phone"}
//           handlerProp={(e) => inputHandler(e)}
//           placeholderProp={"Escribe tu teléfono"}
//           onBlurHandler={(e) => inputValidatorHandler(e)}
//           errorText={isValidContent.phone}
//         />
//         <CustomInput
//           typeProp={"text"}
//           nameProp={"provincia"}
//           handlerProp={(e) => inputHandler(e)}
//           placeholderProp={"Escribe tu provincia"}
//           onBlurHandler={(e) => inputValidatorHandler(e)}
//           errorText={isValidContent.provincia}
//         />
//         <CustomInput
//           typeProp={"email"}
//           nameProp={"email"}
//           handlerProp={(e) => inputHandler(e)}
//           placeholderProp={"Escribe tu correo electrónico"}
//           onBlurHandler={(e) => inputValidatorHandler(e)}
//           errorText={isValidContent.email}
//         />
//         <CustomInput
//           typeProp={"password"}
//           nameProp={"password"}
//           handlerProp={(e) => inputHandler(e)}
//           placeholderProp={"Escribe la contraseña"}
//           onBlurHandler={(e) => inputValidatorHandler(e)}
//           errorText={isValidContent.password}
//         />
//         <CustomInput
//             typeProp={"password"}
//             nameProp={"confirmPassword"}
//             handlerProp={(e) => inputHandler(e)}
//             placeholderProp={"Confirma la contraseña"}
//             onBlurHandler={(e) => inputValidatorHandler(e)}
//             errorText={isValidContent.confirmPassword}
//           />

//         <ButtonC
//           title={"Registrarse"}
//           className={"regularButtonClass"}
//           functionEmit={registerMe}
//         />
//       </>
//     ) : (
//       <div>{msg}</div>
//     )}
//     {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
//   </div>
//   );
// };

import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CusstomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useEffect, useState } from "react";
import { registerNewUserCall } from "../../service/apiCalls";
import { inputValidator } from "../../utils/validator";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import Button from "../../components/ButtonCita/ButtonCita";

import "./Register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    provincia: "",
    isActive: true,
  });
  const [isValidContent, setIsValidContent] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    provincia: "",
    email: "",
    password: ""
  });
  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  
    if (e.target.name === "confirmPassword") {
      validatePasswordConfirmation(e.target.value);
    } else {
      setIsValidContent((prevState) => ({
        ...prevState,
        confirmPassword: "", 
      }));
    }
  };

  const validatePasswordConfirmation = (confirmPassword) => {
    if (confirmPassword !== credentials.password) {
      setIsValidContent((prevState) => ({
        ...prevState,
        confirmPassword: "Las contraseñas no coinciden",
      }));
    } else {
      setIsValidContent((prevState) => ({
        ...prevState,
        confirmPassword: "", 
      }));
    }
  };

  useEffect(() => {
    if (msg !== "") {
      const timeout = setTimeout(() => {
        setCredentials({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          provincia: "",
          isActive: true,
        });
        setIsValidContent({
          firstName: "",
          lastName: "",
          phone: "",
          provincia: "",
          email: "",
          password: ""
        });
        setMsg("");
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [msg]);

  const registerMe = async () => {
    const { firstName, lastName, phone, provincia, email, password } = credentials;
  
    const isValid = {
      firstName: inputValidator(firstName, "name", "firstName"), 
      lastName: inputValidator(lastName, "name", "lastName"), 
      phone: inputValidator(phone, "phone", "phone"), 
      provincia: inputValidator(provincia, "provincia", "provincia"), 
      email: inputValidator(email, "email", "email"), 
      password: inputValidator(password, "password", "password") 
    };
  
    setIsValidContent(isValid);
  
    const allValid = Object.values(isValid).every((val) => val === "");
  
    if (allValid) {
      try {
        const answer = await registerNewUserCall(credentials);
        setMsg("¡Gracias por registrarte!")
        setTimeout(() => {
          
          setMsg(""); // Limpiar el mensaje si no hay error
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.log("Error al registrar el usuario:", error.response.data.message);
        setMsg("Error al registrar el usuario ");
      }
    } else {
      console.log("Credenciales incorrectas, algún campo no está bien introducido");
    }
    console.log(credentials);
  };
  
  return (
    <div className="register-container registerElementsDesign d-flex justify-content-center align-items-center">
      <h3 className="titleRegister">Ingresa tus datos</h3>
      <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
      <Button className="button-cita" text="<  Pedir Cita  >" />
      {msg === "" ? (
        <>
          <CustomInput
            typeProp={"text"}
            nameProp={"firstName"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Escribe tu nombre"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.firstName}
          />
          <CustomInput
            typeProp={"text"}
            nameProp={"lastName"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Escribe tu apellido"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.lastName}
          />
          <CustomInput
            typeProp={"text"}
            nameProp={"phone"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Escribe tu teléfono"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.phone}
          />
          <CustomInput
            typeProp={"text"}
            nameProp={"provincia"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Escribe tu provincia"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.provincia}
          />
          <CustomInput
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Escribe tu correo electrónico"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.email}
          />
          <CustomInput
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Escribe la contraseña"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.password}
          />
          <CustomInput
            typeProp={"password"}
            nameProp={"confirmPassword"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"Confirma la contraseña"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.confirmPassword}
          />

          <ButtonC
            title={"Registrarse"}
            className={"regularButtonClass"}
            functionEmit={registerMe}
          />
        </>
      ) : (
        <div className="msg-register">{msg}</div>
      )}
    </div>
  );
};
