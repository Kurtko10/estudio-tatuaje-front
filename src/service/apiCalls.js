import axios from "axios";


const API_URL = "http://localhost:3010"

export const registerNewUserCall = async (credentials) => {
    return await axios.post(`${API_URL}/api/auth/register`, credentials);
  };

export const loginCall = async (credentials) => {
    console.log(credentials);
    const res = await axios.post(`${API_URL}/api/auth/login`, credentials);
    console.log(res);
    return res;

};


// .get("url", {headers}(opcional))
// .post("url", {body}, {headers})
// .put("url", {body}, {headers})
// .delete("url", {headers})