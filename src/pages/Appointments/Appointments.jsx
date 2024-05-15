import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import { getAppointmentsByClientId, deleteAppointmentById, updateAppointmentById } from "../../service/apiCalls";
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

  const handleDelete = async (appointmentId) => {
    try {
      const confirmDelete = window.confirm("¿Seguro que deseas cancelar tu cita?");
      if (!confirmDelete) return;

      await deleteAppointmentById(appointmentId, token);
      console.log("Cita eliminada con id:", appointmentId);
      getAppointments();
    } catch (error) {
      console.log("Error al eliminar la cita:", error);
    }
  };

  const handleEdit = async (appointmentId, editData) => {
    try {
      await updateAppointmentById(appointmentId, token, { datetime: editData.datetime });
      console.log("Cita actualizada con id:", appointmentId);
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
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          ))
        ) : (
          <p>No hay citas {filter === 'future' ? 'futuras' : filter === 'past' ? 'pasadas' : ''}.</p>
        )}
      </div>
    </div>
  );
};

export default Appointments;


