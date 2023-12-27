import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getByName = (name) => {
    return axios
        .get(`${baseUrl}api/all`)
        .then((response) => {
            return response.data.filter(country => country.name.common.toLowerCase().includes(name));
        })
}

export default {
    getByName: getByName,
}