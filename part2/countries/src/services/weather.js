import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const apiKey = import.meta.env.VITE_SOME_KEY

const getByLatLong = ([lat, long]) => {
    const url = `${baseUrl}?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
    return axios.get(url).then(response => response.data)
}

export default {
    getByLatLong: getByLatLong,
}