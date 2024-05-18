import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';
import { getAppointmentsByClientId, deleteAppointmentById, updateAppointmentById, createAppointment, getAllArtists, bringProfile } from "../../service/apiCalls";
import AppointmentCard from "../../components/AppintmentCard/AppointmentCard";
import { useSelector } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";
import ButtonCita from "../../components/ButtonCita/ButtonCita";
import SocialIcons from "../../components/SocialIcons/SocialIcons";
import { CustomInput } from "../../components/CusstomInput/CustomInput";
import './Appointments.css'; // Importa el archivo CSS

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

  const ArtistService = {
    BLACKWHITE: { id: 1, name: "Black & White" },
    REALISTA: { id: 2, name: "Realista" },
    PIRCING: { id: 3, name: "Pircing" },
    LASER: { id: 4, name: "Laser" },
  };

  useEffect(() => {
    getAppointments();
    fetchClientData();
  }, [userReduxData]);

  useEffect(() => {
    if (location.state?.showModal) {
      setShouldOpenModal(true);
    }
  }, [location]);

  useEffect(() => {
    if (clientId && shouldOpenModal) {
      handleCreateAppointmentClick();
      setShouldOpenModal(false); // Reset the flag
    }
  }, [clientId, shouldOpenModal]);

  const fetchClientData = async () => {
    try {
      const profileData = await bringProfile(token);
      const clientId = profileData.data?.clients?.id;
      console.log("clientId:", clientId);
      setClientId(clientId);
    } catch (error) {
      console.log("Error al obtener los datos del cliente:", error);
    }
  };

  const getAppointments = async () => {
    try {
      const appointmentsData = await getAppointmentsByClientId(token);
      if (!appointmentsData || appointmentsData.length === 0) {
        setAppointments([]);
      } else {
        setAppointments(appointmentsData);
      }
    } catch (error) {
      console.log("Error al obtener las citas del usuario:", error);
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

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'future') {
      return new Date(appointment.datetime) > new Date();
    } else if (filter === 'past') {
      return new Date(appointment.datetime) <= new Date();
    }
    return true;
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
      getAppointments(); // Reload the appointments after creating a new one
    } catch (error) {
      console.log("Error creating appointment:", error);
    }
  };

  return (
    <div className="appointments-container">
      <h1>Citas del usuario</h1>
      <Form.Group controlId="formFilter">
        <Form.Label>Filtrar citas:</Form.Label>
        <Form.Control as="select" value={filter} onChange={handleFilterChange}>
          <option value="future">Futuras</option>
          <option value="past">Pasadas</option>
          <option value="all">Todas</option>
        </Form.Control>
      </Form.Group>
      <ButtonCita text="Crear Nueva Cita" onClick={handleCreateAppointmentClick} className="button-cita create-appointment-button" />
      <SocialIcons urls={["https://whatsapp.com/", "https://tiktok.com/", "https://instagram.com/"]} />
      <Container className="appointments-list-container">
        {filteredAppointments.length > 0 ? (
          <Row className="justify-content-center">
            {filteredAppointments.map(appointment => (
              <Col key={appointment.id} md={6} lg={4}>
                <AppointmentCard 
                  appointment={appointment} 
                  onDelete={handleDelete} 
                  onEdit={handleEdit} 
                />
              </Col>
            ))}
          </Row>
        ) : (
          <Row className="justify-content-center">
            <Col md={6} lg={4}>
              <p>No hay citas {filter === 'future' ? 'futuras' : filter === 'past' ? 'pasadas' : ''}.</p>
            </Col>
          </Row>
        )}
      </Container>

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