import React, { useState } from "react";
import { Card, Button, Modal, Form } from 'react-bootstrap';
import Pircing from "../../img/pircing.jpg";
import Laser from "../../img/laser.jpeg";
import BandW from "../../img/BandW.jpg";
import Realista from "../../img/realista.jpg";
import { deleteAppointmentById, updateAppointmentById } from "../../service/apiCalls";

const AppointmentCard = ({ appointment, token, getAppointments }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    datetime: appointment.datetime,
    service: appointment.service,
    artist: appointment.artist,
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

  const handleDelete = async () => {
    if (appointment.status === 'completada') {
      alert('No se puede eliminar una cita completada.');
      return;
    }

    const confirmDelete = window.confirm("¿Seguro que deseas cancelar tu cita?");
    if (!confirmDelete) {
      return;
    }

    try {
      await deleteAppointmentById(appointment.id, token);
      console.log("Cita eliminada con id:", appointment.id, appointment);
      getAppointments();
    } catch (error) {
      console.log("Error al eliminar la cita:", error);
    }
  };

  const handleEdit = async () => {
    try {
      await updateAppointmentById(appointment.id, token, editData);
      console.log("Cita actualizada con id:", appointment.id, appointment);
      getAppointments();
      setShowEditModal(false);
    } catch (error) {
      console.log("Error al actualizar la cita:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={getServiceImage(appointment.service.name)} />
      <Card.Body>
        <Card.Title>{appointment.service.name}</Card.Title>
        <Card.Text>
          Fecha: {formatDate(appointment.datetime)}
          <br />
          Hora: {formatTime(appointment.datetime)}
          <br />
          Artista: {appointment.artist.name}
          <br />
          Estado: {appointment.status}
        </Card.Text>
        {appointment.status !== 'completada' && (
          <>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
            {new Date(appointment.datetime) > new Date() && (
              <Button variant="warning" onClick={() => setShowEditModal(true)}>
                Editar
              </Button>
            )}
          </>
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
                onChange={handleChange}
                disabled={true}
              />
            </Form.Group>
            <Form.Group controlId="formArtist">
              <Form.Label>Artista</Form.Label>
              <Form.Control
                type="text"
                name="artist"
                value={editData.artist.name}
                onChange={handleChange}
                disabled={true}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleEdit}>
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default AppointmentCard;
