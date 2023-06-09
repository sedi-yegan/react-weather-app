import React, {useState, useEffect } from "react";
import axios from "axios";
import WeatherForecastDay from "./WeatherForecastDay";
import "./WeatherForecast.css";


export default function WeatherForecast(props){

    let[loaded, setLoaded] = useState(false);
     let[forecast, setForecast] = useState(null);

     useEffect(() => {
setLoaded(false);
     }, [props.coordinates]);

    function handleResponse(response){
setForecast(response.data.daily);
setLoaded (true);
    }

if (loaded){

    return (
<div className="weatherForecast">
<div className="row">
    
    {forecast.map(function (dailyForecast, index){

        if (index < 6) {
        return(
            <div className="col-2 g-2" key={index}>
    <WeatherForecastDay data={dailyForecast} />
</div>
        );
        } else{
            return null;
        }
    })}

</div>
</div>

    );
    } else{
      let apiKey = "tb5f08b166ada0ab28a3f4o4dec6c3e0";
        let lon = props.coordinates.longitude;
        let lat= props.coordinates.latitude;
       let apiUrl =`https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
    
    }
    }