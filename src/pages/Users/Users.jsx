import React, { useState, useEffect } from "react";
import { getAllUserProfiles, getUserById } from "../../service/apiCalls";
import { useSelector } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";
import { UserDetailsModal } from "../../components/UserModal/UserDetailsModal";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Table/Table";
import { Pagination } from "react-bootstrap";
import HeaderSidebar from '../../components/HeaderSidebar/HeaderSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import SearchInput from "../../components/SearchInput/SearchInput";
import { deleteUserById } from "../../service/apiCalls";

import "./Users.css";

export const Users = () => {
  const navigate = useNavigate();

  const [userProfiles, setUserProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const profilesPerPage = 5;
  const [showModal, setShowModal] = useState(false);

  

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [allUserProfiles, setAllUserProfiles] = useState([]);

  const userData = useSelector(state => state.user);
  const role= userData.decodificado.userRole

  useEffect(() => {
    if (userData.decodificado.userRole !== "admin" && userData.decodificado.userRole !== "artist") {
      navigate("/"); // Redirigir al usuario si no tiene permiso
    }
  }, [userData.decodificado.userRole, navigate]);
  
  
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

useEffect(() => {
  getAllUserProfiles(token)
    .then((profiles) => {
      setUserProfiles(profiles);
      setAllUserProfiles(profiles);
      
    })
    .catch((error) => {
      console.log("Error al obtener perfiles de usuarios:", error);
      console.log(token);
    });
}, []);



  const handleUserClick = async (userId) => {
    try {
      const userData = await getUserById(userId, token);
      console.log("Datos del usuario:", userData);
      setSelectedUserId(userData);
      setShowModal(true);
    } catch (error) {
      console.log("Error al obtener detalles del usuario:", error);
      navigate("/");
    }
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterUserProfiles = (profile) => {
    const { firstName, lastName, role } = profile;
    const roleString = role.name.toLowerCase();
    const searchLower = searchTerm.toLowerCase();

    return (
      firstName.toLowerCase().includes(searchLower) ||
      lastName.toLowerCase().includes(searchLower) ||
      roleString.includes(searchLower)
    );
  };

  const deleteUser = async (id) => {
    const res = await deleteUserById(id, token);
    console.log(token);
    console.log(id);
    console.log("patata");
  };

  useEffect(() => {
    const filteredProfiles = allUserProfiles.filter(filterUserProfiles);
    setCurrentPage(1);
    setUserProfiles(filteredProfiles);
  }, [searchTerm, allUserProfiles]);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = userProfiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'First Name' },
    { field: 'lastName', headerName: 'Last Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'phone', headerName: 'Phone' },
    {
      field: 'details',
      headerName: 'Details',
      renderCell: (row) => {
        return <button  onClick={() => handleUserClick(row.id)}>View Details</button>;
      },
    },
  ];

  return (
    <div className='admin'> 
      <div className='grid-container'>
        <div>
          <HeaderSidebar OpenSidebar={OpenSidebar}/>
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
        </div>
        <div className="usersView">
          <h1 id="usersTitle">Lista de Usuarios</h1>
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por nombre, apellido o rol" />
          <DataTable rows={currentProfiles} columns={columns} handleUserClick={handleUserClick} />
          {selectedUserId && (
            <UserDetailsModal show={showModal} userData={selectedUserId} onClose={() => setShowModal(false)} handleClose={handleCloseModal} deleteUser={deleteUser} token={token} role={role}/>
          )}
          <Pagination className="mt-3">
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
            {Array.from({ length: Math.ceil(userProfiles.length / profilesPerPage) }).map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(userProfiles.length / profilesPerPage)} />
            <Pagination.Last onClick={() => handlePageChange(Math.ceil(userProfiles.length / profilesPerPage))} />
          </Pagination>
        </div>
      </div>
    </div> 
  );
};





