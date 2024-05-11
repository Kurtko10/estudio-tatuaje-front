import axios from "axios";

//const API_RM_URL = "https://rickandmortyapi.com/api"
const API_URL = "http://localhost:3010"
// const API_URL = "aquí hay una url para un entorno de desarrollo"

// Registro nuevo usuario
export const registerNewUserCall = async (credentials) => {
    return await axios.post(`${API_URL}/api/auth/register`, credentials);
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

export const getAllUserProfiles = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/users`);
    return res.data;
  } catch (error) {
    throw new Error("Error al obtener perfiles de usuarios desde el servidor");
  }
};




// .get("url", {headers}(opcional))
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})