import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { CustomInput } from "../CusstomInput/CustomInput";
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";
import { deleteUserById } from "../../service/apiCalls";

export const UserDetailsModal = ({ show, userData, onClose, handleCloseModal,deleteUser,onUpdate, role, handleArtistClick }) => {
  const [editedUserData, setEditedUserData] = useState(userData || {});

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    setEditedUserData(userData); 
  }, [userData]);

  useEffect(() => {
    if (userData) {
        setEditedUserData({
            ...userData,
            ...userData.user 
          });
          console.log(userData);
    } else {
        setEditedUserData({});
    }
}, [userData]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value
    });
  };

  const handleSaveChanges = () => {
    onUpdate(editedUserData);
    onClose(); 
  };

  

  // const deleteUser = async (id) => {
  //   const res = await deleteUserById(id, token);
  //   handleCloseModal();
  //   console.log(token);
  //   console.log(id);
  //   console.log("patata");
  // };

  return (
    <Modal show={show}  onHide={onClose} onShow={() => handleArtistClick && handleArtistClick(userData.id)}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      {role === "admin" ? (
        <Modal.Body>
          {editedUserData && (
            <div>
              <CustomInput
                typeProp="text"
                nameProp="firstName"
                placeholderProp="Nombre"
                value={editedUserData.firstName || ""}
                handlerProp={handleInputChange}
                isDisabled={false}
              />
              <CustomInput
                typeProp="text"
                nameProp="lastName"
                placeholderProp="Apellido"
                value={editedUserData.lastName || ""}
                handlerProp={handleInputChange}
                isDisabled={false}
              />
              <CustomInput
                typeProp="text"
                nameProp="email"
                placeholderProp="Email"
                value={editedUserData.email || ""}
                handlerProp={handleInputChange}
                isDisabled={true}
              />
              <CustomInput
                typeProp="text"
                nameProp="phone"
                placeholderProp="Teléfono"
                value={editedUserData.phone || ""}
                handlerProp={handleInputChange}
                isDisabled={false}
              />
            </div>
          )}
        </Modal.Body>
      ) : (
        <Modal.Body>
          
          <div>
            <p>ID: {userData.id}</p>
            <p>Nombre: {userData.user ? userData.user.firstName : userData.firstName}</p>
            <p>Apellido: {userData.user ? userData.user.lastName : userData.lastName}</p>
            {userData.specialty && <p>Especialidad: {userData.specialty}</p>}
            {userData.biography && <p>Biografía: {userData.biography}</p>}
            {userData.portfolio && <p>Portfolio: <a href={userData.portfolio} target="_blank" rel="noopener noreferrer">{userData.portfolio}</a></p>}
            {userData.email && (
              <>
                <p>Email: {userData.email}</p>
                <p>Teléfono: {userData.phone}</p>
              </>
            )}
          </div>
        </Modal.Body>
      )}
      
      <Modal.Footer>
        
        {role === "user" && (<Button variant="primary">Pedir Cita</Button>)}
        

        {role === "admin" && (
          <>
            <Button variant="danger" onClick={() => deleteUser(editedUserData.id)}>
              Eliminar
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Guardar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );

  
};



