import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getAllAppointments, deleteAppointmentById, updateAppointmentById, createAppointment, getAllArtists } from '../../service/apiCalls';
import SearchInput from '../../components/SearchInput/SearchInput';
import DataTable from '../../components/Table/Table';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slices/userSlice';
import CustomPagination from '../../components/Pagination/Pagination';
import './AdminAppointments.css';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('future');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('id');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [formData, setFormData] = useState({
    datetime: "",
    service_id: "",
    artist_id: "",
    client_id: ""
  });
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  const ArtistService = {
    BLACKWHITE: { id: 1, name: "Black & White" },
    REALISTA: { id: 2, name: "Realista" },
    PIRCING: { id: 3, name: "Pircing" },
    LASER: { id: 4, name: "Laser" },
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const appointmentsData = await getAllAppointments(token);
      setAppointments(appointmentsData);
    } catch (error) {
      
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const confirmDelete = window.confirm('¿Seguro que deseas cancelar esta cita?');
      if (!confirmDelete) return;

      await deleteAppointmentById(appointmentId, token);
      getAppointments();
    } catch (error) {
      alert('Hubo un error al intentar eliminar la cita.');
    }
  };

  const handleEdit = async (appointmentId, editData) => {
    try {
      const datetimeUTC = new Date(editData.datetime).toISOString();
      await updateAppointmentById(appointmentId, token, {
        datetime: datetimeUTC,
        service_id: editData.service_id,
        artist_id: editData.artist_id,
      });
      getAppointments();
      setShowModal(false);
    } catch (error) {
      
      alert('Hubo un error al intentar actualizar la cita.');
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

  const handleOpenModal = async (appointment, isCreating = false) => {
    try {
      const response = await getAllArtists();
      const fetchedArtists = response[0];
      setArtists(fetchedArtists);
      
      if (!isCreating) {
        const selectedAppointment = appointments.find(appt => appt.id === appointment.id);
        if (selectedAppointment) {
          const filtered = fetchedArtists.filter(artist => artist.specialty.toUpperCase() === selectedAppointment.service.name.toUpperCase());
          setFilteredArtists(filtered);

          const appointmentDatetime = new Date(selectedAppointment.datetime);
          const localDatetime = new Date(appointmentDatetime.getTime() - appointmentDatetime.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

          setSelectedAppointment({
            ...selectedAppointment,
            datetime: localDatetime,
            service_id: selectedAppointment.service.id,
            artist_id: selectedAppointment.artist.id,
          });

          setFormData({
            datetime: localDatetime,
            service_id: selectedAppointment.service.id,
            artist_id: selectedAppointment.artist.id,
            client_id: selectedAppointment.client.id,
          });
        }
      } else {
        setSelectedAppointment({
          datetime: "",
          service_id: "",
          artist_id: "",
          client_id: ""
        });
        setFormData({
          datetime: "",
          service_id: "",
          artist_id: "",
          client_id: ""
        });
        setFilteredArtists([]);
      }
      setShowModal(true);
      setShowNewAppointmentModal(isCreating);
    } catch (error) {
      console.error("Error opening modal: ", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleServiceChange = (e) => {
    const selectedService = e.target.value;
    const serviceId = ArtistService[selectedService.toUpperCase()]?.id || "";
    setFormData(prev => ({ ...prev, service_id: serviceId }));
    const filtered = artists.filter(artist => artist.specialty.toUpperCase() === selectedService.toUpperCase());
    setFilteredArtists(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'artist_id' || name === 'client_id' ? Number(value) : value }));
  };

  const handleCreateAppointment = async () => {
    try {
      if (!formData.artist_id) {
        alert("Por favor, selecciona un artista.");
        return;
      }
      await createAppointment(formData, token);
      setShowNewAppointmentModal(false);
      getAppointments();
    } catch (error) {
      
      alert("Error al crear la cita");
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID Cita' },
    { field: 'clientId', headerName: 'ID cliente' },
    { field: 'clientName', headerName: 'Cliente' },
    { field: 'artistName', headerName: 'Artista' },
    { field: 'serviceName', headerName: 'Servicio' },
    { field: 'datetime', headerName: 'Fecha y Hora' },
    { field: 'actions', headerName: 'Acciones' }
  ];

  const formattedAppointments = appointments.map(appointment => ({
    id: appointment.id,
    clientId: appointment.client.id,
    clientName: appointment.client.lastName,
    artistName: appointment.artist.name,
    serviceName: appointment.service.name,
    datetime: new Date(appointment.datetime).toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    details: 'Detalles'
  }));

  const filteredAppointments = formattedAppointments.filter(appointment => {
    const matchesFilter =
      (filter === 'future' && new Date(appointment.datetime) > new Date()) ||
      (filter === 'past' && new Date(appointment.datetime) <= new Date()) ||
      filter === 'all';

    const matchesSearchQuery = (() => {
      switch (searchCriteria) {
        case 'id':
          return appointment.id.toString().includes(searchQuery);
        case 'clientId':
          return appointment.clientId.toString().includes(searchQuery);
        case 'clientName':
          return appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase());
        case 'artistName':
          return appointment.artistName.toLowerCase().includes(searchQuery.toLowerCase());
        case 'serviceName':
          return appointment.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
        default:
          return false;
      }
    })();

    return matchesFilter && matchesSearchQuery;
  });

  // Paginación
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const paginatedAppointments = filteredAppointments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="admin-appointments-container">
      <div className="admin-appointments-content">
        <h1>Administrar Citas</h1>
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
            <option value="artistName">Artista</option>
            <option value="serviceName">Servicio</option>
          </Form.Control>
        </Form.Group>
        <SearchInput
          placeholder={`Buscar por ${searchCriteria}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <DataTable
          rows={paginatedAppointments}
          columns={columns}
          handleUserClick={(row) => handleOpenModal(row, false)}
          renderActions={(row) => (
            <div className="action-buttons">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleOpenModal(row, false)}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(row.id)}
              >
                Borrar
              </Button>
            </div>
          )}
        />
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Button variant="success" className="mt-3" onClick={() => handleOpenModal(null, true)}>
          Crear Nueva Cita
        </Button>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{showNewAppointmentModal ? "Crear Nueva Cita" : "Detalles de la Cita"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedAppointment && (
              <Form>
                {showNewAppointmentModal && (
                  <Form.Group controlId="formClientId">
                    <Form.Label>ID Cliente</Form.Label>
                    <Form.Control
                      type="text"
                      name="client_id"
                      value={formData.client_id}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                )}
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
                <Form.Group controlId="formService">
                  <Form.Label>Servicio</Form.Label>
                  <Form.Select 
                    name="service_id" 
                    value={formData.service_id} 
                    onChange={handleServiceChange} 
                    required 
                    disabled={!showNewAppointmentModal}
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="BLACKWHITE">Black & White</option>
                    <option value="REALISTA">Realista</option>
                    <option value="PIRCING">Pircing</option>
                    <option value="LASER">Laser</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formArtist">
                  <Form.Label>Artista</Form.Label>
                  <Form.Select 
                    name="artist_id" 
                    value={formData.artist_id} 
                    onChange={handleInputChange} 
                    required
                  >
                    {filteredArtists.map(artist => (
                      <option key={artist.id} value={artist.id}>{artist.user.firstName} {artist.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {showNewAppointmentModal ? (
                  <Button variant="primary" onClick={handleCreateAppointment}>
                    Crear Cita
                  </Button>
                ) : (
                  <Button variant="primary" onClick={() => handleEdit(selectedAppointment.id, formData)}>
                    Guardar Cambios
                  </Button>
                )}
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AdminAppointments;