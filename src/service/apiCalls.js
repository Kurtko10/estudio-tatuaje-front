import axios from "axios";

//const API_RM_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3010"
// const API_URL = "aquí hay una url para un entorno de desarrollo"

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
console.log("estoy crando");
  return await axios.post(`${API_URL}/api/users/`,userData, config);
};
// Login de usuario
export const loginCall = async (credentials) => {
    // console.log(credentials);
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
    console.log(res);
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
  console.log(res, "bringProfile Function");
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
  console.log(res, "yo soy updateProfile")
  console.log(token);
  return res
};

// export const updateProfile = async (data, token, userId = null) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   // Usar userId del parámetro si está presente, de lo contrario, usar el que está implícito en el token
//   const endpoint = userId ? `${API_URL}/api/users/${userId}/profile` : `${API_URL}/api/users/profile`;
//   try {
//     const res = await axios.put(endpoint, data, config);
//     console.log(res, "Actualización de perfil");
//     return res;
//   } catch (error) {
//     console.error("Error al actualizar perfil:", error);
//     throw error;
//   }
// };

export const updateUserProfile = async (userId, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  return axios.put(`${API_URL}/api/users/profile`, userData, config);
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





// .get("url", {headers}(opcional))
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})