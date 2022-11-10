import axios from "axios"

const DOMAIN = 'https://ragram.herokuapp.com/'

const login = async(user) => {

    try {
        return axios.post(DOMAIN + "api/user/login", user)        
    } catch (error) {
        localStorage.removeItem("token")
        return
    }
}

const register = async(user) => {
    try {
        return axios.post(DOMAIN + "api/user", user)        
    } catch (error) {
        localStorage.removeItem("token")
        return
    }
}


const validateToken = async(token) => {
    return await axios.post(DOMAIN + "api/user/verify", {}, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}

const editUser = async(data, token) => {
    let body;
    const {name, pic} = data
    if(name && pic) body = {name, pic}
    else if (name && !pic) body = {name}
    else if (pic && !name) body = {pic}
    return await axios.put(DOMAIN + "api/user", body, {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}

const allUsers = async(token) => {
    return await axios.get(DOMAIN + `api/user` , {
        headers: {
            'Authorization': `Bearer ${token}` 
          }
    })
}

export default {
    login,
    validateToken,
    allUsers,
    register,
    editUser
}