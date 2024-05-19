import axios from "axios";


const API_URL = "http://localhost:3010"

// Registro nuevo usuario
export const registerNewUserCall = async (credentials) => {
    return await axios.post(`${API_URL}/api/auth/register`, credentials);
  };

  // Registro nuevo usuario
export const createNewUserCall = async (userData,token) => {

  const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
  return await axios.post(`${API_URL}/api/users/`,userData, config);
};
// Login de usuario
export const loginCall = async (credentials) => {
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
    
    return res;

};

// Ver perfil de usuario
export const bringProfile = async (token) => {
  const config = {
      headers: {
          Authorization: `Bearer ${token}`
      }
  }
  const res = await axios.get(`${API_URL}/api/users/profile/profile`, config);

  return res;
  
};

// Editar perfil

export const updateProfile = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const res = await axios.put(`${API_URL}/api/users/profile`, data, config)
  return res
};
// Editar usuario 
export const updateUserProfile = async (user_id, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const res = await axios.put(`${API_URL}/api/users/${user_id}`, userData, config);
  return res
};

// Mostrar artistas 
export const getAllArtists = async () => {
  try {
    const res = await axios.get(`${API_URL}/api//users/role/artists`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener perfiles de artistas desde el servidor");
  }
}; 

// Mostrar todos los usuarios
export const getAllUserProfiles = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    
    };
    const res = await axios.get(`${API_URL}/api/users`, config);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener perfiles de usuarios desde el servidor");
  }
};

// Mostrar usuario por ID
export const getUserById = async (userId, token) => {
  try {
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    
    };

    const res = await axios.get(`${API_URL}/api/users/${userId}`, config);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener el usuario por ID desde el servidor");
  }
};

// Eliminar usuraio
export const deleteUserById = async (userId,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  try {
    const res = await axios.delete(`${API_URL}/api/users/${userId}`, config);
    return res.data;
  } catch (error) {
    // Manejo de errores
    console.error("Error al eliminar el usuario:", error);
    throw error;
  }
};

// Ver cita de un usuario 

export const getAppointmentsByClientId = async (token) => {
  try {
     
      const config = {
          headers: {
              Authorization: `Bearer ${token}`
          }
      };
      const res = await axios.get(`${API_URL}/api/appointments/client/`, config);    
      return res.data;
  } catch (error) {
      throw error;
  }
};

//Eliminar cita por el usuario

export const deleteAppointmentById = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/api/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAppointmentById = async (id, token, appointmentData) => {
  try {
    const response = await axios.put(`${API_URL}/api/appointments/${id}`, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAppointment = async (appointmentData, token) => {
  try {  
    const response = await axios.post(`${API_URL}/api/appointments`, appointmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {

    throw error;
  }
};

// Obtener todas las citas(ADMIN)
export const getAllAppointments = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching all appointments:', error);
    throw error;
  }
};

export const getAppointmentsByArtistId = async (token) => {
  const response = await fetch(`${API_URL}/api/appointments/artist/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error fetching appointments by artist');
  }

  return await response.json();
};



// .get("url", {headers}(opcional))
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})