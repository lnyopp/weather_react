import React, { Component } from "react";
import axios from "axios";
import "moment-timezone";
import moment from "moment";
import zipcode_to_timezone from "zipcode-to-timezone";

import "./App.css";

class App extends Component {
  state = {};

  getTime = () => {
    var zip = zipcode_to_timezone.lookup(this.state.zip);
    console.log(zip);
    var time = moment().tz(zip).format("hh:mm z");
    console.log(time);
    this.setState({
      timezone: time,
    });
  };

  getWeather = () => {
    let zipCode = document.getElementById("zipInput").value;
    const api = process.env.REACT_APP_WEATHER_API_KEY;
    let url = "https://api.openweathermap.org/data/2.5/weather?";

    axios
      .get(url + "zip=" + zipCode + "&units=imperial&us&appid=" + api)
      .then((res) => {
        console.log(res.data);
        this.setState({
          zip: zipCode,
          name: res.data.name,
          temperature: Math.floor(res.data.main.temp),
          weather: res.data.weather[0].main,
        });
        this.getTime();
      });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.getWeather();
    }
  };

  render() {
    return (
      <div id="userInfo">
        <input
          onKeyPress={this.handleKeyPress}
          type="text"
          placeholder="EnterZipcode"
          id="zipInput"
        ></input>
        <div className="returnedInfo">
          <div id="name">{this.state.name}</div>
          <div id="temp">{this.state.temperature}</div>
          <div id="weather">{this.state.weather}</div>
          <div id="timeZone">{this.state.timezone}</div>
        </div>
      </div>
    );
  }
}

export default App;
