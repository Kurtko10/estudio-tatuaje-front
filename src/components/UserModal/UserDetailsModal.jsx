import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { CustomInput } from "../CusstomInput/CustomInput";
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";
import { deleteUserById } from "../../service/apiCalls";

export const UserDetailsModal = ({ show, userData, onClose, handleClose, role, handleArtistClick }) => {
  const [editedUserData, setEditedUserData] = useState(userData || {});

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;


  
  
  useEffect(() => {
    setEditedUserData(userData || {});
  }, [userData]);

  const handleCloseModal = () => {
    setEditedUserData({});
    handleClose(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value
    });
  };

  const handleSaveChanges = () => {
    console.log(editedUserData); // Lógica para guardar los cambios
  };

  const deleteUser = async (id) => {
    const res = await deleteUserById(id, token);
    handleCloseModal();
    console.log(token);
    console.log(id);
    console.log("patata");
  };

  return (
    <Modal show={show} onHide={handleCloseModal} onShow={() => handleArtistClick && handleArtistClick(userData.id)}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {editedUserData && (
          <div>
            <CustomInput
              typeProp="text"
              nameProp="firstName"
              placeholderProp="Nombre"
              value={editedUserData.firstName || ""}
              handlerProp={handleInputChange}
              isDisabled={(role === "admin")?false : true}
            />
            <CustomInput
              typeProp="text"
              nameProp="lastName"
              placeholderProp="Apellido"
              value={editedUserData.lastName || ""}
              handlerProp={handleInputChange}
              isDisabled={(role === "admin")?false : true}
            />
            <CustomInput
              typeProp="text"
              nameProp="email"
              placeholderProp="Email"
              value={editedUserData.email || ""}
              handlerProp={handleInputChange}
              isDisabled={(role === "admin")?false : true}
            />
            <CustomInput
              typeProp="text"
              nameProp="phone"
              placeholderProp="Teléfono"
              value={editedUserData.phone || ""}
              handlerProp={handleInputChange}
              isDisabled={(role === "admin")?false : true }
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        {(role === "admin")&& (
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
