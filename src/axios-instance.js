import axios from 'axios'

//BASE URL
const instance = axios.create({ baseURL: 'https://insta-book-api.herokuapp.com/api/' });
instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("authToken")}`

export default instance