
import React, { useState, useEffect } from "react";
import {
  getAllUserProfiles,
  getUserById,
  deleteUserById,
  updateUserProfile,
  createNewUserCall
} from "../../service/apiCalls";
import { useSelector } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";
import { UserDetailsModal } from "../../components/UserModal/UserDetailsModal";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/Table/Table";
import { Pagination } from "react-bootstrap";
import HeaderSidebar from '../../components/HeaderSidebar/HeaderSidebar';
import Sidebar from '../../components/Sidebar/Sidebar';
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import SearchInput from "../../components/SearchInput/SearchInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";

import "./Users.css";

export const Users = () => {
  const navigate = useNavigate();

  const [userProfiles, setUserProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const profilesPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [allUserProfiles, setAllUserProfiles] = useState([]);
  const userData = useSelector(state => state.user);
  const role = userData.decodificado.userRole;

  const ArtistService = {
    BLACKWHITE: { id: 1, name: "Black & White" },
    REALISTA: { id: 2, name: "Realista" },
    PIRCING: { id: 3, name: "Pircing" },
    LASER: { id: 4, name: "Laser" },
  };

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
  }, [token]);

  const handleUserClick = async (userId,role, isCreating = false) => {
    setIsCreating(isCreating);
    console.log(userId);
    if (isCreating) {
      setSelectedUser(null);
      setShowModal(true);
    } else {
      try {
        const userData = await getUserById(userId, token);
        console.log(userData);
        console.log(userData.role.name);
        setSelectedUser(userData);
        setShowModal(true);
      } catch (error) {
        console.log("Error al obtener detalles del usuario:", error);
        navigate("/");
      }
    }
    console.log(isCreating);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
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
    try {
      const response = await deleteUserById(id, token);
      console.log("Usuario eliminado:", response);
      const updatedProfiles = await getAllUserProfiles(token);
      setUserProfiles(updatedProfiles);
      setAllUserProfiles(updatedProfiles);
      handleCloseModal();
    } catch (error) {
      console.log("Error al eliminar el usuario:", error);
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await createNewUserCall(userData, token);
      const updatedProfiles = await getAllUserProfiles(token);
      setUserProfiles(updatedProfiles);
      setAllUserProfiles(updatedProfiles);
      setShowModal(false);
      setIsCreating(false);
      console.log(response);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const updateUser = async (updatedUserData) => {
    try {
      console.log(updatedUserData.id);
      const payload = { ...updatedUserData, user_id: updatedUserData.id };
      const response = await updateUserProfile(updatedUserData.id, payload, token);
      const updatedUserProfiles = userProfiles.map(user =>
        user.id === updatedUserData.id ? { ...user, ...updatedUserData } : user
      );
      setUserProfiles(updatedUserProfiles);
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
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

  const handleSave = (userData) => {
    if (isCreating) {
      createUser(userData);
    } else {
      updateUser(userData);
    }
  };

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
        return <button onClick={() => handleUserClick(row.id, false)}>View Details</button>;
      },
    },
  ];

  return (
    <div className='admin'>
      <div className='grid-container'>
        <div>
          <HeaderSidebar OpenSidebar={OpenSidebar} />
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        </div>
        <div className="usersView">
          <h1 id="usersTitle">Lista de Usuarios</h1>
          <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por nombre, apellido o rol" />
          <DataTable rows={currentProfiles} columns={columns} handleUserClick={handleUserClick} />
          <UserDetailsModal
            show={showModal}
            userData={selectedUser}
            onClose={handleCloseModal}
            isCreating={isCreating}
            deleteUser={deleteUser}
            onUpdate={updateUser}
            onSave={handleSave}
            token={token}
            role={role}
          />
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
          <ButtonC
            title={"Nuevo Usuario"}
            className={"regularButtonClass newUser"}
            onClick={() => handleUserClick(null, true)}
          />
        </div>
        <HomeSidebar />
      </div>
    </div>
  );
};
