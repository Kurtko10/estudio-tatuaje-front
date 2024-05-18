import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { getAllAppointments } from '../../service/apiCalls';
import SearchInput from '../../components/SearchInput/SearchInput';
import DataTable from '../../components/Table/Table';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slices/userSlice';
import CustomPagination from '../Pagination/Pagination';
import './AdminAppointments.css';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('future');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('id');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
      const appointmentsData = await getAllAppointments(token);
      setAppointments(appointmentsData);
      console.log(appointmentsData);
    } catch (error) {
      console.log('Error al obtener todas las citas:', error);
    }
  };

  const handleDelete = async (appointmentId) => {
    try {
      const confirmDelete = window.confirm('¿Seguro que deseas cancelar esta cita?');
      if (!confirmDelete) return;

      await deleteAppointmentById(appointmentId, token);
      getAppointments();
    } catch (error) {
      console.log('Error al eliminar la cita:', error);
    }
  };

  const handleEdit = async (appointmentId, editData) => {
    try {
      await updateAppointmentById(appointmentId, token, { datetime: editData.datetime });
      getAppointments();
    } catch (error) {
      console.log('Error al actualizar la cita:', error);
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

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
        case 'datetime':
          return appointment.datetime.includes(searchQuery);
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
            <option value="datetime">Fecha (DD/MM/AA)</option>
          </Form.Control>
        </Form.Group>
        <SearchInput
          placeholder={`Buscar por ${searchCriteria}`}
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <DataTable rows={paginatedAppointments} columns={columns} handleUserClick={handleOpenModal} />
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de la Cita</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedAppointment && (
              <Form>
                <Form.Group controlId="formDatetime">
                  <Form.Label>Fecha y Hora</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="datetime"
                    value={selectedAppointment.datetime}
                    onChange={(e) => setSelectedAppointment({ ...selectedAppointment, datetime: e.target.value })}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </Form.Group>
                <Button variant="primary" onClick={() => handleEdit(selectedAppointment.id, selectedAppointment)}>
                  Guardar Cambios
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AdminAppointments;