import React, { useState } from "react";
import { Card, Button, Modal, Form } from 'react-bootstrap';
import Pircing from "../../img/pircing.jpg";
import Laser from "../../img/laser.jpeg";
import BandW from "../../img/BandW.jpg";
import Realista from "../../img/realista.jpg";
import "./AppointmentCard.css";

const AppointmentCard = ({ appointment, onDelete, onEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    datetime: "",
    service: { name: "" },
    artist: { name: "" }
  });

  const getServiceImage = (serviceName) => {
    switch (serviceName) {
      case "BlackWhite":
        return BandW;
      case "Realista":
        return Realista;
      case "Pircing":
        return Pircing;
      case "Laser":
        return Laser;
      default:
        return "placeholder.jpg";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDatetimeLocal = (dateString) => {
    const date = new Date(dateString);
    const timezoneOffset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - timezoneOffset);
    return localDate.toISOString().slice(0, 16);
  };

  const handleShowEditModal = () => {
    setEditData({
      datetime: formatDatetimeLocal(appointment.datetime),
      service: appointment.service,
      artist: appointment.artist,
    });
    setShowEditModal(true);
  };

  const handleSaveChanges = () => {
    onEdit(appointment.id, { datetime: editData.datetime });
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const isInProgress = (appointmentDate) => {
    const now = new Date();
    const appointmentDay = new Date(appointmentDate);
    return (
      now.getFullYear() === appointmentDay.getFullYear() &&
      now.getMonth() === appointmentDay.getMonth() &&
      now.getDate() === appointmentDay.getDate()
    );
  };

  const getCardClass = () => {
    switch (appointment.status) {
      case "COMPLETED":
        return "completed";
      case "PENDING":
        return "pending";
      case "IN_PROGRESS":
        return isInProgress(appointment.datetime) ? "in-progress" : "";
      default:
        return "";
    }
  };

  return (
    <Card className={getCardClass()} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={getServiceImage(appointment.service.name)} />
      <Card.Body className={appointment.status === 'COMPLETED' ? 'card-body-disabled' : ''}>
        <Card.Title>{appointment.service.name}</Card.Title>
        <Card.Text>
          Id cita: {appointment.id}
          <br />
          Fecha: {formatDate(appointment.datetime)}
          <br />
          Hora: {formatTime(appointment.datetime)}
          <br />
          Artista: {appointment.artist.name}
          <br />
          Estado: {appointment.status}
        </Card.Text>
        <Button variant="danger" onClick={() => onDelete(appointment.id)} disabled={appointment.status === 'COMPLETED'}>
          Eliminar
        </Button>
        {appointment.status !== 'COMPLETED' && new Date(appointment.datetime) > new Date() && (
          <Button variant="warning" onClick={handleShowEditModal}>
            Editar
          </Button>
        )}
      </Card.Body>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDatetime">
              <Form.Label>Fecha y Hora</Form.Label>
              <Form.Control
                type="datetime-local"
                name="datetime"
                value={editData.datetime}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formService">
              <Form.Label>Servicio</Form.Label>
              <Form.Control
                type="text"
                name="service"
                value={editData.service.name}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formArtist">
              <Form.Label>Artista</Form.Label>
              <Form.Control
                type="text"
                name="artist"
                value={editData.artist.name}
                disabled
              />
            </Form.Group>
            <Button variant="primary" onClick={handleSaveChanges}>
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default AppointmentCard;