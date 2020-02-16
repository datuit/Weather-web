import React from "react";
import "./App.scss";
import { Container, Input } from "reactstrap";
import axios from "axios";

const Icons = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-alt-cloudy",
  "03d": "wi-cloud",
  "03n": "wi-cloud",
  "04d": "wi-cloudy",
  "04n": "wi-cloudy",
  "09d": "wi-rain",
  "09n": "wi-rain",
  "10d": "wi-day-rain",
  "10n": "wi-night-alt-rain",
  "11d": "wi-day-lightning",
  "11n": "wi-night-lightning",
  "13d": "wi-day-snow",
  "13n": "wi-night-alt-snow",
  "50d": "wi-dust",
  "50n": "wi-dust"
};
// console.log(Icons.hasOwnProperty("01d"));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      main: "...",
      icon: "",
      description: "...",
      name: "...",
      arrItems: [],
      temperature: 0
    };
  }

  setWeather = item => {
    const lat = item.geocodePoints[0].coordinates[0];
    const lon = item.geocodePoints[0].coordinates[1];
    const name = item.address.adminDistrict;
    axios({
      method: "GET",
      url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=15d7d2d0d4a489e05feb0ee6cf59b7bb`
    })
      .then(res => {
        this.setState({
          icon: Icons[res.data.weather[0].icon],
          main: res.data.weather[0].main,
          description: res.data.weather[0].description,
          arrItems: [],
          name: name,
          temperature: Math.round(res.data.main.temp) - 273
        });
      })
      .then()
      .catch(e => alert("lỗi từ api weather"));
    document.querySelector(".search .input-search").value = "";
  };
  onChange = e => {
    if (e.target.value) {
      axios({
        method: "GET",
        url: `https://dev.virtualearth.net/REST/v1/Locations?q=${e.target.value}&maxResults=20&key=AtYQBO45F9ORGtHUJHDdZBmKHCEJoS6CsQFTJM3hb7fjRhI9BvPJHcIXkb1-MiWI`
      })
        .then(res => {
          console.log(res);
          this.setState({
            arrItems: res.data.resourceSets[0].resources.slice(0, 5)
          });
        })
        .catch(e => alert("lỗi từ api weather"));
    } else {
      this.setState({
        arrItems: []
      });
    }
  };

  // sendItem = item => {
  //   this.setState({
  //     arrItems: []
  //   });
  //   document.querySelector(".search .input-search").value = "";

  // };
  render() {
    console.log(this.state);
    const { arrItems, icon, name, temperature, ElmIcon } = this.state;
    return (
      <div className="main-app">
        <div className="signature">Thành Đạt</div>
        <div className="weather p-2">
          <Container>
            <h1 className="text-center text-uppercase font-weight-bold logo">
              WEATHER
            </h1>
            <div className="search">
              <i className="fa fa-map-marker-alt location-icon"></i>
              <Input
                placeholder="Search"
                className="input-search"
                onChange={this.onChange}
              />
              <ul className="search-item">
                {arrItems.map((item, i) => (
                  <li
                    className="item"
                    key={i}
                    onClick={() => this.setWeather(item)}
                  >
                    {item.address.formattedAddress}
                  </li>
                ))}
              </ul>
            </div>
            <div className="weather-main text-center">
              <i
                className={`wi ${icon || `wi-day-sunny`} main-image mt-5 mb-4`}
              ></i>
              <h3>{temperature === 0 ? "" : temperature}°C</h3>
              <h5>{name}</h5>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}
