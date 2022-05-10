import React from "react";
import axios from "axios";
import { useState } from "react";
import "./styles.css";

export default function App() {
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [description, setDescription] = useState("");

  const apiKey = "0bc9fba0b8d10da8446ed9925c183a29";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  async function getCurrentWeather(e) {
    e.preventDefault();
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setTemp(response.data.main.temp);
        setHumidity(response.data.main.humidity);
        setDescription(response.data.weather[0].description);
      } else {
        throw new Error("Something went wrong!");
      }

      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    
    <div className="container">
      <div className="card"> 
      <u><h1>Welcome to React Weather App</h1></u>
      <br/>
      <br/>
      <div className="image">
        <img src="https://nordicapis.com/wp-content/uploads/5-Best-Free-and-Paid-Weather-APIs-2019-e1587582023501.png" alt="a" height={250}
    width={500}
    style={{ alignSelf: 'center' }}/>
        </div>
      <br/>
      <br/>
      
        <div>
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                getCurrentWeather(e);
              }
            }}
          >
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              className="search-input"
              placeholder="enter your city"
            />
            <button
              className="btn"
              onClick={(e) => getCurrentWeather(e)}
              type="submit"
            >
              Check
            </button>
          </form>
        </div>
        {temp && (
          <div>
            <h3 className="title">
              Current Temperature in <span> {`${city}`} </span>
            </h3>
            <p className="temperature">
              <h1>{Math.round(temp)}°C</h1></p>

            <p className="title">Humidity: <b>{humidity}</b></p>
            <p className="title">Description: <h2>{description}</h2></p><br/>

            <h1>Thanks for Searching on our site</h1>
            <h2>Do Visit Again</h2>
          </div>
        )}
      </div>
    </div>
  );
}
