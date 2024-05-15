import React from "react";
import { Card, Button } from 'react-bootstrap';
import Pircing from "../../img/pircing.jpg";
import Laser from "../../img/laser.jpeg";
import BandW from "../../img/BandW.jpg";
import Realista from "../../img/realista.jpg";
import { deleteAppointmentById } from "../../service/apiCalls";

const AppointmentCard = ({ appointment, token, getAppointments }) => {
  // Función para obtener la imagen según el tipo de servicio
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

  // Función para formatear la fecha en formato DD/MM/AAAA
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES");
  };

  // Función para formatear la hora en formato HH:MM
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    if (appointment.status === 'COMPLETED') {
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
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;
