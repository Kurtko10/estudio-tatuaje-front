import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { getAppointmentsByClientId, deleteAppointmentById, updateAppointmentById, createAppointment, getAllArtists, bringProfile, getAppointmentsByArtistId } from "../../service/apiCalls";
import AppointmentCard from "../../components/AppintmentCard/AppointmentCard";
import { useSelector } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";
import ButtonCita from "../../components/ButtonCita/ButtonCita";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import { CustomInput } from "../../components/CusstomInput/CustomInput";
import SearchInput from '../../components/SearchInput/SearchInput';
import DataTable from '../../components/Table/Table';
import CustomPagination from '../../components/Pagination/Pagination';
import './Appointments.css'; 

const Appointments = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('future');
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [formData, setFormData] = useState({
    datetime: "",
    service_id: "",
    artist_id: "",
    client_id: ""
  });
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;
  const [clientId, setClientId] = useState(null);
  const [shouldOpenModal, setShouldOpenModal] = useState(false);
  const [role, setRole] = useState(userReduxData.role?.name || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('id');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const ArtistService = {
    BLACKWHITE: { id: 1, name: "Black & White" },
    REALISTA: { id: 2, name: "Realista" },
    PIRCING: { id: 3, name: "Pircing" },
    LASER: { id: 4, name: "Laser" },
  };

  useEffect(() => {
    if (token) {
      fetchClientData();
    }
  }, [token]);

  useEffect(() => {
    if (role) {
      getAppointments();
    }
  }, [role]);

  useEffect(() => {
    if (location.state?.showModal) {
      setShouldOpenModal(true);
    }
  }, [location]);

  useEffect(() => {
    if (clientId && shouldOpenModal) {
      handleCreateAppointmentClick();
      setShouldOpenModal(false);
    }
  }, [clientId, shouldOpenModal]);

  const fetchClientData = async () => {
    try {
      const profileData = await bringProfile(token);
      const clientId = profileData.data?.clients?.id;
      const userRole = profileData.data?.role?.name; 
      console.log('User role:', userRole);
      setRole(userRole);
      setClientId(clientId);
    } catch (error) {
      console.log("Error al obtener los datos del cliente:", error);
    }
  };

  const getAppointments = async () => {
    try {
      let appointmentsData = [];
      if (role === 'manager') {
        appointmentsData = await getAppointmentsByArtistId(token);
      } else {
        appointmentsData = await getAppointmentsByClientId(token);
      }
      console.log('Appointments data:', appointmentsData); // Log the appointments data
      setAppointments(appointmentsData || []);
    } catch (error) {
      console.log("Error al obtener las citas:", error);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const confirmDelete = window.confirm("¿Seguro que deseas cancelar tu cita?");
      if (!confirmDelete) return;

      await deleteAppointmentById(appointmentId, token);
      getAppointments();
    } catch (error) {
      console.log("Error al eliminar la cita:", error);
    }
  };

  const handleEdit = async (appointmentId, editData) => {
    try {
      await updateAppointmentById(appointmentId, token, { datetime: editData.datetime });
      getAppointments();
    } catch (error) {
      console.log("Error al actualizar la cita:", error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesFilter =
      (filter === 'future' && new Date(appointment.datetime) > new Date()) ||
      (filter === 'past' && new Date(appointment.datetime) <= new Date()) ||
      filter === 'all';

    const matchesSearchQuery = (() => {
      switch (searchCriteria) {
        case 'id':
          return appointment.id.toString().includes(searchQuery);
        case 'clientId':
          return appointment.client?.id?.toString().includes(searchQuery);
        case 'clientName':
          return appointment.client?.lastName?.toLowerCase().includes(searchQuery.toLowerCase());
        case 'serviceName':
          return appointment.service?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        default:
          return false;
      }
    })();

    return matchesFilter && matchesSearchQuery;
  });

  const handleCreateAppointmentClick = () => {
    if (clientId) {
      setFormData((prevState) => ({ ...prevState, client_id: clientId }));
      setShowNewAppointmentModal(true);
    } else {
      console.log("Client ID is undefined");
    }
  };

  const handleServiceChange = async (e) => {
    const selectedService = e.target.value;
    const serviceId = ArtistService[selectedService.toUpperCase()].id;
    setFormData((prevState) => ({ ...prevState, service_id: serviceId }));
    try {
      const response = await getAllArtists();
      const fetchedArtists = response[0];
      const filtered = fetchedArtists.filter(artist => artist.specialty.toUpperCase() === selectedService.toUpperCase());
      setArtists(fetchedArtists);
      setFilteredArtists(filtered);
    } catch (error) {
      console.log("Error fetching artists:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: name === 'artist_id' || name === 'client_id' ? Number(value) : value }));
  };

  const handleCreateAppointment = async () => {
    try {
      await createAppointment(formData, token);
      setShowNewAppointmentModal(false);
      getAppointments(); 
    } catch (error) {
      console.log("Error creating appointment:", error);
    }
  };

  // Paginación
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    { field: 'id', headerName: 'ID Cita' },
    { field: 'clientId', headerName: 'ID Cliente' },
    { field: 'clientName', headerName: 'Cliente' },
    { field: 'serviceName', headerName: 'Servicio' },
    { field: 'datetime', headerName: 'Fecha y Hora' },
  ];

  const formattedAppointments = appointments.map(appointment => {
    console.log('Formatting appointment:', appointment);
    return {
      id: appointment.id,
      clientId: appointment.client?.id || '',
      clientName: appointment.client?.lastName || '',
      serviceName: appointment.service?.name || '',
      datetime: formatDateTime(appointment.datetime),
    };
  });

  console.log('Formatted appointments:', formattedAppointments);

  return (
    <div className="appointments-container">
      <h1>Citas {role === 'manager' ? 'del artista' : 'del usuario'}</h1>
      <Form.Group controlId="formFilter">
        <Form.Label>Filtrar citas:</Form.Label>
        <Form.Control as="select" value={filter} onChange={handleFilterChange}>
          <option value="future">Futuras</option>
          <option value="past">Pasadas</option>
          <option value="all">Todas</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formSearchCriteria">
        <Form.Label>Criterio de Búsqueda:</Form.Label>
        <Form.Control as="select" value={searchCriteria} onChange={handleCriteriaChange}>
          <option value="id">ID Cita</option>
          <option value="clientId">ID Cliente</option>
          <option value="clientName">Cliente</option>
          <option value="serviceName">Servicio</option>
        </Form.Control>
      </Form.Group>
      <SearchInput
        placeholder={`Buscar por ${searchCriteria}`}
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {role !== 'manager' && (
        <ButtonCita text="Crear Nueva Cita" onClick={handleCreateAppointmentClick} className="button-cita create-appointment-button" />
      )}
      <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
      {role === 'manager' ? (
        <Container className="appointments-list-container">
          {paginatedAppointments.length > 0 ? (
            <>
              <DataTable
                rows={formattedAppointments}
                columns={columns}
                handleUserClick={() => {}}
              />
              <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <Row className="justify-content-center">
              <Col md={6} lg={4}>
                <p>No hay citas {filter === 'future' ? 'futuras' : filter === 'past' ? 'pasadas' : ''}.</p>
              </Col>
            </Row>
          )}
        </Container>
      ) : (
        <Container className="appointments-list-container">
          <Row className="justify-content-center">
            {paginatedAppointments.length > 0 ? (
              paginatedAppointments.map(appointment => (
                <Col key={appointment.id} md={6} lg={4}>
                  <AppointmentCard 
                    appointment={appointment} 
                    onDelete={handleDelete} 
                    onEdit={handleEdit} 
                  />
                </Col>
              ))
            ) : (
              <Col md={6} lg={4}>
                <p>No hay citas {filter === 'future' ? 'futuras' : filter === 'past' ? 'pasadas' : ''}.</p>
              </Col>
            )}
          </Row>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Container>
      )}

      <Modal show={showNewAppointmentModal} onHide={() => setShowNewAppointmentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nueva Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formClientId">
              <Form.Label>Num. cliente</Form.Label>
              <CustomInput
                typeProp="text"
                nameProp="client_id"
                valueProp={clientId}
                placeholderProp={clientId}
                isDisabled={true}
              />
            </Form.Group>
            <Form.Group controlId="formService">
              <Form.Label>Servicio</Form.Label>
              <Form.Select name="service_id" value={Object.keys(ArtistService).find(key => ArtistService[key].id === formData.service_id) || ""} onChange={handleServiceChange} required>
                <option value="">Selecciona un servicio</option>
                <option value="BLACKWHITE">Black & White</option>
                <option value="REALISTA">Realista</option>
                <option value="PIRCING">Pircing</option>
                <option value="LASER">Laser</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formArtist">
              <Form.Label>Artista</Form.Label>
              <Form.Select name="artist_id" value={formData.artist_id} onChange={handleInputChange} required>
                <option value="">Selecciona un artista</option>
                {filteredArtists.map(artist => (
                  <option key={artist.id} value={artist.id}>{artist.user.firstName} {artist.name} </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="formDatetime">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                name="datetime"
                value={formData.datetime}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().slice(0, 16)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreateAppointment}>
              Crear Cita
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Appointments;
