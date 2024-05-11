import React from 'react';
import { useSelector } from 'react-redux';

const Admin = () => {
  // Obtener la información del usuario desde el estado de Redux
  const userData = useSelector(state => state.user);

  return (
    <div>
      <h1>¡Bienvenido al Espacio del Administrador!</h1>
      <p>¡Hola, {userData.decodificado.name}! Estás en el espacio del administrador.</p>
      <p>Tu rol es: {userData.decodificado.userRole}</p>
      {/* Puedes agregar más información del usuario aquí si lo deseas */}
    </div>
  );
};

export default Admin;