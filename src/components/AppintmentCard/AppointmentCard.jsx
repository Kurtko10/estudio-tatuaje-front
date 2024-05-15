import React from "react";
import { Button, Card } from 'react-bootstrap';
import Pircing from "../../img/pircing.jpg"
import Laser from "../../img/laser.jpeg";
import BandW from "../../img/BandW.jpg";
import Realista from "../../img/realista.jpg";
//import { deleteAppointment } from '../../service/apiCalls';

const AppointmentCard = ({ appointment, token, getAppointments }) => {
  // Función para obtener la imagen según el tipo de servicio
  const getServiceImage = (serviceName) => {
    console.log("serviceName:", serviceName); 
    if (serviceName === "BlackWhite") {
        console.log("B and W");
      return BandW; 
    } else if (serviceName === "Realista") {
      return Realista; 
    } else if (serviceName === "Pircing") {
        console.log("pircing");
      return Pircing; 
    } else if (serviceName === "Laser") {
      return Laser; 
    } else {
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

  // Función para manejar la eliminación de citas
  const handleDelete = async (appointmentId) => {
    if (window.confirm("¿Seguro que deseas cancelar tu cita?")) {
      try {
        const response = await deleteAppointment(appointmentId, token);
        getAppointments();
      
        console.log(response); 
      } catch (error) {
       
        console.error("Error al eliminar la cita:", error.message);
       
      }
    }
  };


  console.log("Datos de la cita:", appointment);

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
        </Card.Text>
        <Button variant="primary" onClick={() => handleDelete(appointment.id)}>Eliminar</Button>
      </Card.Body>
    </Card>
  );
};

export default AppointmentCard;

