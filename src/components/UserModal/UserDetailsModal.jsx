import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CustomInput } from "../CusstomInput/CustomInput";
import { useSelector } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";

const ArtistService = {
  BLACKWHITE: { id: 1, name: "BlackWhite" },
  REALISTA: { id: 2, name: "Realista" },
  PIRCING: { id: 3, name: "Pircing" },
  LASER: { id: 4, name: "Laser" },
};

export const UserDetailsModal = ({ show, userData, onClose, deleteUser, onSave, onUpdate, role, isCreating }) => {
  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    roleId: '',
    roleName: '',
    isActive: true,
    specialty: '',
    provincia: ''
  });

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    if (isCreating) {
      setFormData({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '12345678',
        roleId: '',
        roleName: '',
        isActive: true,
        specialty: '',
        provincia: ''
      });
    } else if (userData) {
      setFormData({
        ...userData,
        roleId: userData.role ? userData.role.id : '',
        roleName: userData.role ? userData.role.name : '',
      });
    }
  }, [isCreating, userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (e) => {
    const newRoleId = e.target.value;
    const newState = {
      ...formData,
      roleId: newRoleId,
      specialty: newRoleId === '2' ? formData.specialty : '',
      provincia: newRoleId === '3' ? formData.provincia : ''
    };
    setFormData(newState);
  };

  const handleSpecialtyChange = (e) => {
    setFormData(prev => ({
      ...prev,
      specialty: e.target.value
    }));
  };

  const roleSpecificFields = (roleId) => {
    switch (roleId) {
      case '2': // Artist
        return (
          <>
            <Form.Group controlId="formSpecialtySelect">
              <Form.Label>Especialidad</Form.Label>
              <Form.Control as="select" value={formData.specialty} onChange={handleSpecialtyChange}>
                <option value="">Seleccione una Especialidad</option>
                {Object.values(ArtistService).map(service => (
                  <option key={service.id} value={service.name}>{service.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </>
        );
      case '3': // Client
        return (
          <>
            <CustomInput
              typeProp="text"
              nameProp="provincia"
              placeholderProp="Provincia"
              value={formData.provincia}
              handlerProp={handleInputChange}
            />
          </>
        );
      default:
        return null;
    }
  };

  const handleSave = () => {
    const userData = {
      ...formData,
      roleId: parseInt(formData.roleId),
      specialty: formData.roleId === '2' ? formData.specialty : undefined,
      provincia: formData.roleId === '3' ? formData.provincia : undefined
    };

    if (!userData.firstName || !userData.lastName || !userData.email || !userData.phone || !userData.password || !userData.roleId) {
      console.error("Todos los campos necesarios deben estar presentes");
      return;
    }

    if (userData.roleId === 2 && !userData.specialty) {
      console.error("El campo de especialidad es necesario para los artistas");
      return;
    }

    onSave(userData);
    onClose();
  };

  const handleSaveChanges = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isCreating ? "Crear Nuevo Usuario" : "Editar Usuario"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
        {!isCreating && (
            <CustomInput
              typeProp="text"
              nameProp="id"
              placeholderProp={`ID usuario: ${formData.id}`}
              value={formData.id}
              handlerProp={handleInputChange}
              isDisabled={true}
            />
          )}
          <CustomInput
            typeProp="text"
            nameProp="firstName"
            placeholderProp="Nombre"
            value={formData.firstName}
            handlerProp={handleInputChange}
          />
          <CustomInput
            typeProp="text"
            nameProp="lastName"
            placeholderProp="Apellido"
            value={formData.lastName}
            handlerProp={handleInputChange}
          />
          <CustomInput
            typeProp="email"
            nameProp="email"
            placeholderProp="Email"
            value={formData.email}
            handlerProp={handleInputChange}
            isDisabled={!isCreating}
          />
          <CustomInput
            typeProp="text"
            nameProp="phone"
            placeholderProp="Teléfono"
            value={formData.phone}
            handlerProp={handleInputChange}
          />
          
          {isCreating && (
            <>
              <CustomInput
                typeProp="password"
                nameProp="password"
                placeholderProp="Contraseña"
                value={formData.password}
                handlerProp={handleInputChange}
              />
              <Form.Group controlId="formRoleSelect">
                <Form.Label>Rol</Form.Label>
                <Form.Control as="select" value={formData.roleId} onChange={handleRoleChange}>
                  <option value="">Seleccione un Rol</option>
                  <option value="1">Admin</option>
                  <option value="2">Artist</option>
                  <option value="3">Client</option>
                </Form.Control>
                {roleSpecificFields(formData.roleId)}
              </Form.Group>
            </>
          )}
          {!isCreating && (
            <CustomInput
              typeProp="text"
              nameProp="roleName"
              placeholderProp="Rol"
              value={formData.roleName}
              handlerProp={handleInputChange}
              isDisabled={true}
            />
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={() => deleteUser(formData.id)} disabled={isCreating}>
          Eliminar
        </Button>
        <Button variant="primary" onClick={isCreating ? handleSave : handleSaveChanges}>
          {isCreating ? "Crear" : "Guardar Cambios"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};