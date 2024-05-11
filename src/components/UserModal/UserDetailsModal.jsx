
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export const UserDetailsModal = ({ userData, handleClose }) => {
  const [show, setShow] = useState(true);

  // Log para verificar los datos recibidos
  useEffect(() => {
    console.log("Datos del modal:", userData);
  }, [userData]);

  const handleCloseModal = () => {
    setShow(false);
    handleClose(); // Llama a la función de cierre
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Muestra los datos en el modal */}
        {userData && (
          <div>
            <p>ID: {userData.id}</p>
            <p>Nombre: {userData.user ? userData.user.firstName : userData.firstName}</p>
            <p>Apellido: {userData.user ? userData.user.lastName || userData.name : userData.lastName}</p>
            {userData.specialty && <p>Especialidad: {userData.specialty}</p>}
            {userData.biography && <p>Biografía: {userData.biography}</p>}
            {userData.portfolio && <p>Portfolio: <a href={userData.portfolio}>{userData.portfolio}</a></p>}
            {userData.email && (
              <>
                <p>Email: {userData.email}</p>
                <p>Teléfono: {userData.phone}</p>
              </>
            )}
            {userData.clients ? (
              <>
                <p>Provincia: {userData.clients.provincia}</p>
                <p>Tipo de Usuario: Cliente</p>
              </>
            ) : userData.role && userData.role.name === "admin" ? (
              <>
                <p>Tipo de Usuario: Administrador</p>
              </>
            ) : userData.artists ? (
              <p>Tipo de Usuario: Artista</p>
            ) : (
              <p>Tipo de Usuario: Artista</p>
            )}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

