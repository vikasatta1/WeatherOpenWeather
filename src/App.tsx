import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios'
import './index.css';

type dataResponce = {
    base: string,
    clouds: { all: number },
    cod: number,
    coord: { lon: number, lat: number },
    dt: number,
    id: number,
    main: any,
    name: string,
    sys: { type: number, id: number, country: string, sunrise: number, sunset: number },
    timezone: number,
    visibility: number,
    weather: Array<any>
    wind: { speed: number, deg: number }
}

function App() {

    const [cityName, setCityName] = useState('')
    const [data, setData] = useState<dataResponce | null>(null)
    const [location, setLocation] = useState('')
    const apiKey = '24cd562bc08de33b11c7e4e4c48459bd'

    const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.currentTarget.value)
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
    const searchLocation = (event: any) => {
        if (event.key === "Enter") {

            axios.get(url).then(res => {
                setData(res.data)
                console.log(res.data)
                setLocation('')
            })
        }
    }

    return (
        <div className="app">
            <div className="search">
                <input
                    type={'text'}
                    placeholder={'Enter Location'}
                    value={location} onChange={changeInput}
                    onKeyPress={searchLocation}
                />
            </div>
            <div className="container">

                <div className="top">
                    <div className="location">
                        {data ? <p>{data?.name}</p> : ''}
                    </div>
                    {data ?   <div className="temp">
                        <h1>{(((+(data?.main.feels_like) - 32) / 1.8000)/10).toFixed()}°C</h1>
                    </div>:''}
                    {data ?   <div className="description">
                        <p>Clouds</p>
                    </div> :''}
                </div>
                {data ?   <div className="bottom">
                    <div className="feels">
                        <p>{(((+(data?.main.feels_like) - 32) / 1.8000)/10).toFixed()}°C</p>
                         <p>Feels Like</p>
                    </div>
                    <div className="humidity">
                       <p>{data?.main.humidity}%</p>
                     <p>Humidity</p>
                    </div>
                     <div className="wind">
                        <p>{data?.wind.speed} MPH</p>
                        <p>Winds</p>
                    </div>
                </div>: ''}
            </div>

        </div>
    );
}

export default App;
