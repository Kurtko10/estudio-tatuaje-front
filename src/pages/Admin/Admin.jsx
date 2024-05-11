import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import HeaderSidebar from '../../components/HeaderSidebar/HeaderSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomeSidebar from '../../components/HomeSidebar/HomeSidebar';
import "./Admin.css";

 

const Admin = () => {


     // Obtener la información del usuario desde el estado de Redux
 const userData = useSelector(state => state.user);

 const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }  

     

  return (
  <div className='admin'> 
    <div className='grid-container'>
        <div>
            <HeaderSidebar OpenSidebar={OpenSidebar}/>
            <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
            <HomeSidebar />
        </div>
     <h1>¡Bienvenido al Espacio del Administrador!</h1>
     <p>¡Hola, {userData.decodificado.userName}! Estás en el espacio del administrador.</p>
     <p>Tu rol es: {userData.decodificado.userRole}</p>
     
   </div>
   </div> 
  )
};

export default Admin;


