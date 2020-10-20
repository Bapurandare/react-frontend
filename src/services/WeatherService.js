import axios from 'axios'

const WEATHER_REST_API_URL = "http://localhost:8080/api/weatherDetails/";

class WeatherService{

    getWeather(city){
        console.log("success")

        return axios.get(WEATHER_REST_API_URL, {
            params: {
                city
            }
        })
    }
}

export default new WeatherService()