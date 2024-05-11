import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, selectUserData } from "../../app/slices/userSlice";
import {getUserData } from "../../app/slices/userSlice";
import { Form, Card, Row, Col, Button } from "react-bootstrap";
import { bringProfile } from "../../service/apiCalls";
import { CustomInput } from "../../components/CusstomInput/CustomInput";
import ButtonCita from "../../components/ButtonCita/ButtonCita";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
//import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
//import { updateProfile } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
//---------------------------------------------------------

export const Profile = () => {

    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        lastname: ""
      });  


  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const userData = useSelector((state) => state.user.userData);
  const myPassport = useSelector(getUserData)
  const token = myPassport.token;
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  //const [updateData, setUpdateData] = useState({});
  //const [showProfileModal, setShowProfileModal] = useState(false);
  

  const inputHandler = (e) => {
    setUpdateData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
            
            navigate("/"); // Redirigir a la página de inicio si no hay token
            return 
          }
        const myProfileData = await bringProfile(token);
        setUserData(myProfileData.data); 
      } catch (error) {
        console.log("Error al obtener el perfil:", error);
        
      }
    };
    fetchProfile();
  }, [token]);


//   const handleSaveChanges = async () => {
//     try {
//       await dispatch(updateProfile({ updateData, token }));
//       setShowProfileModal(false);
//       bringProfileHandler();
//     } catch (error) {
//       console.log("Error al actualizar el usuario:", error);
//     }
//   };

const resetLoggedCount = () => {
    console.log(veces)
  }

if (!token) {
    console.log("adios");
    return null;
  }

  return (
//     <>
//         <div className="justify-content-center text-center profile-container">
//             <ButtonCita className="button-cita" text="<  Pedir Cita  >" />
//             <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
//             <Form id="formProfile">
//                 <div>{userData?.firstName}, aquí está tu perfil</div>
//                 <Form.Group className="mb-3" controlId="formName">
//                     <Form.Label>Nombre:</Form.Label>
//                     <CustomInput
//                         typeProp="name"
//                         nameProp="firstName"
//                         placeholderProp={userData?.firstName}
//                         valueProp={userData?.firstName}
//                         isDisabled={true}
//                         disableValidation={true}
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formLastname">
//                     <Form.Label>Apellidos:</Form.Label>
//                     <CustomInput
//                         typeProp="lastname"
//                         nameProp="lastName"
//                         placeholderProp={userData?.lastName}
//                         valueProp={userData?.lastName}
//                         isDisabled={true}
//                         disableValidation={false}
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                     <Form.Label>Email:</Form.Label>
//                     <CustomInput
//                         typeProp="email"
//                         nameProp="email"
//                         placeholderProp={userData?.email}
//                         valueProp={userData?.email}
//                         isDisabled={true}
//                         handlerProp={inputHandler}
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formPhone">
//                     <Form.Label>Teléfono: </Form.Label>
//                     <CustomInput
//                         typeProp="text"
//                         nameProp="phone"
//                         placeholderProp={userData?.phone || ""}
//                         valueProp={userData?.phone || ""}
//                         isDisabled={true}
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formProvincia">
//                     <Form.Label>Provincia:</Form.Label>
//                     <CustomInput
//                         typeProp="text"
//                         nameProp="provincia"
//                         placeholderProp={userData?.clients?.provincia || ""}
//                         valueProp={userData?.clients?.provincia || ""}
//                         isDisabled={true}
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3" controlId="formClientsId">
//                     <Form.Label>Num.cliente:</Form.Label>
//                     <CustomInput
//                         typeProp="text"
//                         nameProp="clientsId"
//                         placeholderProp={`Número de cliente: ${userData?.clients?.id || ""}`}
//                         valueProp={userData?.clients?.id || ""}
//                         isDisabled={true}
//                     />
//                 </Form.Group>
//                 {/* <p>Datos del usuario</p>
//                 {userData && (
//                     <pre>
//                         {JSON.stringify(userData, null, 2)}
//                     </pre>
//                 )} */}
//             </Form>
//             {/* <BootstrapModal
//   show={showProfileModal}
//   handleClose={() => setShowProfileModal(false)}
//   handleSaveChanges={handleSaveChanges}
//   profileData={userData}
//   inputHandler={inputHandler}
//   token={token}
//   bringProfileHandler={bringProfileHandler} // Pasa bringProfileHandler como prop al componente BootstrapModal
// /> */}

// <Button variant="danger" onClick={() => navigate("/appointments")}>Citas</Button>
//             {/* Renderizar las tarjetas */}
//             <Row className="justify-content-center text-center">
//                 <Col md={6}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Editar perfil</Card.Title>
//                             {/* Contenido de la tarjeta para el perfil del usuario */}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={6}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title>Citas</Card.Title>
//                             {/* Contenido de la tarjeta para las citas del usuario */}
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </div>
//                         </>
<>
  <div className="justify-content-center text-center profile-container">
    <ButtonCita className="button-cita" text="<  Pedir Cita  >" />
    <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
    <Form id="formProfile">
      <div className="titleProfile">{userData?.firstName}, aquí está tu perfil</div>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre:</Form.Label>
            <CustomInput
              typeProp="name"
              nameProp="firstName"
              placeholderProp={userData?.firstName}
              valueProp={userData?.firstName}
              isDisabled={true}
              disableValidation={true}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formLastname">
            <Form.Label>Apellidos:</Form.Label>
            <CustomInput
              typeProp="lastname"
              nameProp="lastName"
              placeholderProp={userData?.lastName}
              valueProp={userData?.lastName}
              isDisabled={true}
              disableValidation={false}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <CustomInput
              typeProp="email"
              nameProp="email"
              placeholderProp={userData?.email}
              valueProp={userData?.email}
              isDisabled={true}
              handlerProp={inputHandler}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>Teléfono:</Form.Label>
            <CustomInput
              typeProp="text"
              nameProp="phone"
              placeholderProp={userData?.phone || ""}
              valueProp={userData?.phone || ""}
              isDisabled={true}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formProvincia">
            <Form.Label>Provincia:</Form.Label>
            <CustomInput
              typeProp="text"
              nameProp="provincia"
              placeholderProp={userData?.clients?.provincia || ""}
              valueProp={userData?.clients?.provincia || ""}
              isDisabled={true}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="formClientsId">
            <Form.Label>Num. cliente:</Form.Label>
            <CustomInput
              typeProp="text"
              nameProp="clientsId"
              placeholderProp={`Número de cliente: ${userData?.clients?.id || ""}`}
              valueProp={userData?.clients?.id || ""}
              isDisabled={true}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
    {/* <BootstrapModal
//   show={showProfileModal}
//   handleClose={() => setShowProfileModal(false)}
//   handleSaveChanges={handleSaveChanges}
//   profileData={userData}
//   inputHandler={inputHandler}
//   token={token}
//   bringProfileHandler={bringProfileHandler} // Pasa bringProfileHandler como prop al componente BootstrapModal
// /> */}
    <Button variant="danger" onClick={() => navigate("/appointments")}>Citas</Button>
    <Row className="justify-content-center text-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Editar perfil</Card.Title>
            {/* Contenido de la tarjeta para el perfil del usuario */}
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <Card.Body>
            <Card.Title>Citas</Card.Title>
            {/* Contenido de la tarjeta para las citas del usuario */}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>
</>
    );
};





