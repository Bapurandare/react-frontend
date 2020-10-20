import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


import WeatherService from '../services/WeatherService';
import Geocode from "react-geocode";
Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
Geocode.setLanguage("en");


class WeatherComponent extends React.Component{

    constructor(props){
        super(props);
       this.state = {
           weatherData:[],
           city: "",
           reactCity: "",
           tempDegrees: 0,
           tempF: 0,
           humidity: 0,
           pressure: 0,
           wind: 0,
           description: "",
           checked: true,
           selectedOptionReact: "",
           selectedTypeTemp: 0,
           icon: "",
           iconUrl: "",
           backEndDorF: "",
           redirect: false
       } 
    }
    

    componentDidMount(){
        console.log("Hello!")
    }

    handleCityChange = (e) => {
        this.setState({city: e.target.value});
    }

    handleCityChangeReact = (e) => {
        this.setState({reactCity: e.target.value});
    }



    getCityName(){

//         fetch('http://example.com/api', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json'}
// });
        // const res = fetch('http://localhost:8080/api/weatherCall?cityname=Dallas',{headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000/','Content-Type': 'application/json'}});
        // const resp = res.json();
        // console.log(res)
        var variablec = "Dallas";
        return axios.get("http://localhost:8080/api/weatherCall?cityname="+variablec).then((response) => 
            {
            console.log(response)
            }
        ).catch(err => console.warn(err));
        //console.log(resp);
    }

    getWeatherWithReact = async() =>{

        //city_name = this.state.city;
        const weatherApiCall = await fetch("http://api.openweathermap.org/data/2.5/weather?q="+this.state.reactCity+"&appid=6db1dd1c8c5fafd8f6543c5c944cacdc").catch((error) => {
            console.error('Error:', error);
          });
        const resp = await weatherApiCall.json();

        console.log(resp);
        // this.state.tempDegrees = resp.main.temp;
        
        // this.state.humidity = resp.main.humidity;
        // this.state.pressure = resp.main.pressure;
        // this.state.description = resp.weather.description;
        //this.state.wind = resp.wind.speed;
        this.setState({humidity: resp.main.humidity});
        this.setState({tempDegrees: resp.main.temp});
        this.setState({pressure: resp.main.pressure});
        this.setState({description: resp.weather[0].description});
        this.setState({wind: resp.wind.speed});
        this.setState({icon: resp.weather[0].icon});

        console.log(this.state.icon)
        this.setReactTemperature();

        // this.state.iconUrl="http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png";
        // var imageName = "http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png";
        //var imageName = require({this.state.iconUrl});


        //10/15/2020 @ 12:00pm (UTC)
        // const weatherApiCall1 = await fetch("http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1602849600&appid=6db1dd1c8c5fafd8f6543c5c944cacdc");
        // const resp1 = await weatherApiCall1.json();

        //10/15/2020 @ 12:00pm (UTC)
        // const weatherApiCall4 = await fetch("http://api.openweathermap.org/data/2.5/onecall/timemachine?q=Dallas&dt=1602849600&appid=6db1dd1c8c5fafd8f6543c5c944cacdc");
        // const resp4 = await weatherApiCall4.json();

        //10/16/2020 @ 12:00pm (UTC)
        // const weatherApiCall2 = await fetch("http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1602763200&appid=6db1dd1c8c5fafd8f6543c5c944cacdc");
        // const resp2 = await weatherApiCall2.json();

        //10/14/2020 @ 12:00pm (UTC)
        // const weatherApiCall3 = await fetch("http://api.openweathermap.org/data/2.5/onecall/timemachine?lat=60.99&lon=30.9&dt=1602676800&appid=6db1dd1c8c5fafd8f6543c5c944cacdc");
        // const resp3 = await weatherApiCall3.json();

        //console.log("this is the end: "+ resp4.current.sunrise + resp4.current.dt);
        // console.log("this is it: "+ resp1.current.sunrise + resp1.current.dt);
        // console.log(resp1);
        // console.log(resp2);
        // console.log(resp3);
    }
    
    // handleSubmit= async () =>{
    //     // const weatherinfo = fetch("http://localhost:8080/api/weatherCall?cityname="+this.state.city); //+"&tempType="+this.state.selectedOption,{mode: 'cors'});
    //     // const info = (await weatherinfo).json();
    //     // console.log(info);

    //     try {
    //         const response = await axios.get("http://localhost:8080/api/weatherDetails");
    //         console.log(response);
    //     } catch (err) {
    //         return console.warn(err);
    //     }
    // }

    handleSubmit = (e) => {
        console.log("Entered City+: " + this.state.city);
        WeatherService.getWeather(this.state.city).then((response) => {
            this.setState({weatherData: response.data})
            }
        ); 

        this.getCityName();
    }

    handleSubmitReact = (e) => {
        console.log("Entered City+: " + this.state.reactCity);
        this.getWeatherWithReact();
    }


    setReactTemperature= async () =>{
        if(this.state.selectedOptionReact === "" || this.state.selectedOptionReact === "Kelvin"){
            this.setState({selectedTypeTemp: this.state.tempDegrees})
            //this.state.selectedTypeTemp= this.state.tempDegrees
        }
        if(this.state.selectedOptionReact === "Degrees"){
            const kelvinToCelsius = require('kelvin-to-celsius');
            //this.state.selectedTypeTemp = await kelvinToCelsius(this.state.tempDegrees);          
            this.setState({selectedTypeTemp: await kelvinToCelsius(this.state.tempDegrees)})
            //this.state.selectedTypeTemp= this.state.tempDegrees

        }if(this.state.selectedOptionReact === "Farhenheit"){
            const kelvinToFahrenheit =  require('kelvin-to-fahrenheit');
            //this.state.selectedTypeTemp = await kelvinToFahrenheit(this.state.tempDegrees);
            this.setState({selectedTypeTemp: await kelvinToFahrenheit(this.state.tempDegrees)})
            //this.state.selectedTypeTemp= this.state.tempDegrees
        }             
        
        console.log("tempdegrees: "+this.state.tempDegrees)

        // console.log("Submit value of sO:" + this.state.tempDegrees)
        //this.state.selectedTypeTemp = this.state.tempDegrees;
        console.log("selected temp is selectedTypeTemp: "+this.state.selectedTypeTemp)

    }

    setTemperature= async () =>{
        if(this.state.selectedOption === "" || this.state.selectedOption === "Kelvin"){
            this.setState({selectedTypeTemp: this.state.tempDegrees})
            //this.state.selectedTypeTemp= this.state.tempDegrees
        }
        if(this.state.selectedOption === "Degrees"){
            const kelvinToCelsius = require('kelvin-to-celsius');
            //this.state.selectedTypeTemp = await kelvinToCelsius(this.state.tempDegrees);          
            this.setState({selectedTypeTemp: await kelvinToCelsius(this.state.tempDegrees)})
            //this.state.selectedTypeTemp= this.state.tempDegrees

        }if(this.state.selectedOption === "Farhenheit"){
            const kelvinToFahrenheit =  require('kelvin-to-fahrenheit');
            //this.state.selectedTypeTemp = await kelvinToFahrenheit(this.state.tempDegrees);
            this.setState({selectedTypeTemp: await kelvinToFahrenheit(this.state.tempDegrees)})
            //this.state.selectedTypeTemp= this.state.tempDegrees
        }             
        
        console.log("tempdegrees: "+this.state.tempDegrees)

        // console.log("Submit value of sO:" + this.state.tempDegrees)
        //this.state.selectedTypeTemp = this.state.tempDegrees;
        console.log("selected temp is selectedTypeTemp: "+this.state.selectedTypeTemp)

    }



    onValueChangeReact = (e) => {
        this.state.selectedOptionReact = e.currentTarget.value;
        //this.setState({selectedOption: e.currentTarget.value})   //find out why this is not working
        console.log("print val selectedOptionReact: "+this.state.selectedOptionReact)

        console.log("print val selectedtypetempReact: "+this.state.selectedTypeTemp)
        console.log("print target val"+e.currentTarget.value)
        //console.log("print val"+this.state.selectedOption)
    }

    onValueChange = (e) => {
        this.state.selectedOption = e.currentTarget.value;
        //this.setState({selectedOption: e.currentTarget.value})   //find out why this is not working
        console.log("print val selectedOption: "+this.state.selectedOption)

        console.log("print target val"+e.currentTarget.value)
        //console.log("print val"+this.state.selectedOption)
    }

    // handleSubmitGetRealTime =(e) => {
    //     //redirecting to 8080
    //     var url = "http://localhost:8080/api/weatherCall?cityname="+this.state.city;
    //     return <Redirect to= "http://localhost:8080/api/weatherCall?cityname=Dallas" />
    // }

    setRedirect = () => {
        this.setState({
          redirect: true
        })
      }
      renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='http://localhost:8080/api/weatherCall?cityname=Dallas' />
        }
      }

    getLatLong(){
        Geocode.fromAddress(this.state.city).then(
            response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            },
            error => {
            console.error(error);
            }
        );
    }
    

    render(){
        return(
            <div>
                <br></br>
                <h1 className ="text-center"> Weather Data With Spring Boot</h1>
                {/* <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"></img> */}
                <form>
                    <input type="text" name="city" placeholder="city" value={this.state.city} onChange={this.handleCityChange} /><br></br>
                    {/* <div>
                        <label>  Degrees  </label> <input type="radio" value="Degrees" name="unit" onChange={this.onValueChange}/>
                        <label>  Farhenheit  </label> <input type="radio" value="Farhenheit" name="unit" onChange={this.onValueChange}/>
                        <label>  Kelvin  </label> <input type="radio" value="Kelvin" name="unit" onChange={this.onValueChange}/>
                    </div> */}
                    <button type="button" onClick={this.handleSubmit}>Get Weather</button>
                    {/* <div>
                        {this.renderRedirect()}
                        <button onClick={this.setRedirect}>Redirect</button>
                    </div> */}
                </form>

                {/* {this.state.weatherData.weather.icon} */}

                <br></br>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            {/* <td>Day</td> */}
                            <td>Temperature in Degrees</td>
                            <td>Temperature in Farhenheit</td>
                            <td>Humidity</td>
                            <td>Pressure</td>
                            <td>Wind</td>
                            <td>Predictions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.weatherData.map(
                                weather =>
                                   <tr> 
                                        {/* key = {weather.day}>
                                     <td>{weather.day}</td> */}
                                    <td>{weather.degreeTemperature}</td>
                                    <td>{weather.fahrenheitTemperature}</td>
                                    <td>{weather.humidity}</td>
                                    <td>{weather.pressure}</td>
                                    <td>{weather.wind}</td>
                                    <td>{weather.predictions}</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                
                <h1 className ="text-center"> Weather Data With React</h1>
                <form>
                    <input type="text" name="cityReact" placeholder="cityReact" value={this.state.reactCity} onChange={this.handleCityChangeReact} /><br></br>
                    <div>
                        <label>Degrees</label> <input type="radio" value="Degrees" name="unit" onChange={this.onValueChangeReact}/><br></br>
                        <label>Farhenheit</label> <input type="radio" value="Farhenheit" name="unit" onChange={this.onValueChangeReact}/><br></br>
                        <label>Kelvin</label> <input type="radio" value="Kelvin" name="unit" onChange={this.onValueChangeReact}/>
                    </div>
                    <button type="button" onClick={this.handleSubmitReact}>Get Weather</button>
                </form>

                {/* <img src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"></img> */}


                <img src={"http://openweathermap.org/img/wn/"+this.state.icon+"@2x.png"}></img>

                <br></br>
                    <table className = "table table-striped">
                        <thead>
                            <tr>
                                <td>Temperature</td>
                                <td>Humidity</td>
                                <td>Pressure</td>
                                <td>Wind</td>
                                <td>Description</td>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>{this.state.selectedTypeTemp}</td>
                                    <td>{this.state.humidity}</td>
                                    <td>{this.state.pressure}</td>
                                    <td>{this.state.wind}</td>
                                    <td>{this.state.description}</td>
                                </tr>
                        </tbody>
                    </table>
            </div>
        )
    }
}


export default WeatherComponent