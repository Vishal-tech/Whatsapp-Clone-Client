import axios from "axios";

const instance = axios.create({
baseURL: "https://whatsapp-clone-server-vishal.herokuapp.com",

});

export default instance;