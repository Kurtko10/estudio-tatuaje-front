import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CustomInput } from "../CusstomInput/CustomInput";
import { updateProfile } from "../../service/apiCalls";
import { inputValidator } from "../../utils/validator";
import  "./BootstrapModal.css";

function BootstrapModal({ profileData, token, setUserData }) {
  const [show, setShow] = useState(false);
  const [updatedData, setUpdatedData] = useState(profileData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasChanges, setHasChanges] = useState(false);


  const handleClose = () => {
    setShow(false);

    const updatedProfileData = { ...profileData };
  
    for (const key in updatedData) {
      if (updatedData.hasOwnProperty(key) && updatedData[key] !== profileData[key]) {
        updatedProfileData[key] = updatedData[key];
      }
    }
  
    setUpdatedData(updatedProfileData);
    setFormSubmitted(false);
    setEmailError("");
  };
  
  const handleShow = () => setShow(true);

  const inputHandler = (e) => {
    const { name, value } = e.target;
  
    if (value !== profileData[name] && value !== undefined) {
      setUpdatedData({ ...updatedData, [name]: value });
    }
  
    if (name === "email") {
      const errorMessage = inputValidator(value, "email", "email");
      setEmailError(errorMessage);
    }
    setHasChanges(true);
  };

  const handleUpdate = async () => {
    try {
      setFormSubmitted(true);
      const changes = {};
  
      for (const [key, value] of Object.entries(updatedData)) {
        if (value !== profileData[key]) {
          changes[key] = value;
        }
      }
  
      if (Object.keys(changes).length === 0) {
        handleClose();
        return;
      }
  
      if (updatedData.email !== undefined) {
        const emailErrorMessage = inputValidator(updatedData.email, "email", "email");
        if (emailErrorMessage) {
          setEmailError(emailErrorMessage);
          return;
        }
      }

      const updatedUserData = { ...profileData, ...changes };
      setUserData(updatedUserData);
      console.log(profileData, "perfil original");
  
      await updateProfile(changes, token);
      console.log(updatedData, "cambiosssss");
  
      handleClose();
    } catch (err) {
      console.log("Error al actualizar el usuario:", err);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Modificar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edita tus datos!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomInput
            typeProp="name"
            nameProp="firstName"
            placeholderProp={profileData?.firstName}
            valueProp={updatedData?.firstName || profileData?.firstName}
            isDisabled={false}
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="lastname"
            nameProp="lastName"
            placeholderProp={profileData?.lastName}
            valueProp={updatedData?.lastName}
            isDisabled={false}
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="email"
            nameProp="email"
            placeholderProp={profileData?.email}
            valueProp={updatedData?.email || profileData?.email}
            isDisabled={false}
            handlerProp={inputHandler}
            onBlurHandler={() => {
    // Validar el formato del correo electrónico al dejar de hacer focus
              const errorMessage = inputValidator(updatedData.email, "email", "email");
              setEmailError(errorMessage);
            }}
              errorMessage={emailError}
          />
          <CustomInput
            typeProp="text"
            nameProp="phone"
            placeholderProp={profileData?.phone || ""}
            valueProp={updatedData?.phone || profileData?.phone || ""}
            isDisabled={false}
            handlerProp={inputHandler}
            errorMessage={
              formSubmitted && updatedData.phone
                ? inputValidator(updatedData.phone, "phone", "phone")
                : ""
            }
          />
          <CustomInput
            typeProp="text"
            nameProp="provincia"
            placeholderProp={profileData?.clients?.provincia || ""}
            valueProp={updatedData?.provincia || ""}
            isDisabled={true}
            handlerProp={inputHandler}
          />
          <CustomInput
            typeProp="text"
            nameProp="clientsId"
            placeholderProp={`Número de cliente: ${profileData?.clients?.id || ""}`}
            valueProp={updatedData?.clientsId || ""}
            isDisabled={true}
            handlerProp={inputHandler}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={!hasChanges || emailError}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BootstrapModal;

