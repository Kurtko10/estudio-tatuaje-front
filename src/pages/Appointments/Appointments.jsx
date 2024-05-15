import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Card, Button } from 'react-bootstrap';
import { getAppointmentsByClientId } from "../../service/apiCalls";
import AppointmentCard from "../../components/AppintmentCard/AppointmentCard";
import { useSelector } from 'react-redux';
import { getUserData } from "../../app/slices/userSlice";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('future'); 
  const userReduxData = useSelector(getUserData);
  const token = userReduxData.token;

  useEffect(() => {
    getAppointments();
  }, []);

  const getAppointments = async () => {
    try {
     
  
      const appointmentsData = await getAppointmentsByClientId(token);
  
      
      if (!appointmentsData || appointmentsData.length === 0) {
        
        console.log("No hay citas para este usuario.");
        setAppointments([]);
      } else {
        setAppointments(appointmentsData);
        console.log(appointmentsData);
      }
    } catch (error) {
      console.log("Error al obtener las citas del usuario:", error);
      navigate("/profile");
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
  

  return (
    <div>
      <h1>Citas del usuario</h1>
      <Form.Group controlId="formFilter">
        <Form.Label>Filtrar citas:</Form.Label>
        <Form.Control as="select" value={filter} onChange={handleFilterChange}>
          <option value="future">Futuras</option>
          <option value="past">Pasadas</option>
          <option value="all">Todas</option>
        </Form.Control>
      </Form.Group>
      <div>
  {filteredAppointments.length > 0 ? (
    filteredAppointments.map(appointment => (
      <AppointmentCard key={appointment.id} appointment={appointment} token={token} getAppointments={getAppointments}/>
    ))
  ) : (
    <p>No hay citas {filter === 'future' ? 'futuras' : filter === 'past' ? 'pasadas' : ''}.</p>
  )}
</div>
    </div>
  );
};

export default Appointments;



