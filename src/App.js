import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import './App.css';
import Weather from './Weather';
import Movies from './Movies';


class App extends Component {
  state = {
    searchquery: '',
    location: { lat: null, lon: null, display_name: null },
    mapUrl: '',
    weatherData: null,
    movieData: null
  };

  setWeather = (val) => {
    this.setState({ weatherData: val });
  };

  setMovies = (val) => {
    this.setState({ movieData: val });
  };

  getWeather = async (city_name, lat, lon) => {
    const useLocalhost = false;
    const host = 'https://city-explorer-lgyr.onrender.com';
    const localhost = 'http://localhost:3003';

    const baseAPI = useLocalhost ? localhost : host;
    const weatherAPI = `${baseAPI}/weather?city_name=${city_name}&lat=${lat}&lon=${lon}`;

    try {
      const res = await axios.get(weatherAPI);
      this.setWeather(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  getMovies = async (city_name) => {
    const useLocalhost = false;
    const host = 'https://city-explorer-lgyr.onrender.com';
    const localhost = 'http://localhost:3003';

    const baseAPI = useLocalhost ? localhost : host;
    const moviesAPI = `${baseAPI}/movies?city_name=${city_name}`;

    try {
      const res = await axios.get(moviesAPI);
      this.setMovies(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MAP_KEY}&q=${this.state.searchquery}&format=json`;
    try {
      const res = await axios.get(API);
      const { lat, lon, display_name } = res.data[0];
      this.setState({ location: { lat, lon, display_name } });

      const mapAPI = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_KEY}&center=${lat},${lon}&zoom=13`;
      this.setState({ mapUrl: mapAPI });

      this.getWeather(this.state.searchquery, lat, lon);
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="mt-5 container">
        <h1>City Explorer Application</h1>
        <Form>
          <Form.Group as={Row} controlId="formSearch">
            <Form.Label column sm={2}>
              Search for a city
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter a city"
                value={this.state.searchquery}
                onChange={(e) => this.setState({ searchquery: e.target.value })}
              />
            </Col>
            <Col sm={2}>
              <Button variant="primary" onClick={this.getLocation}>
                Explore!
              </Button>
            </Col>
          </Form.Group>
        </Form>

        {this.state.location.lat !== null && this.state.location.lon !== null && (
          <div className="mt-3">
            <h3>The city is: {this.state.location.display_name}!</h3>
            <Row>
              <Col>
                <h4>Latitude:</h4>
                <p>{this.state.location.lat}</p>
              </Col>
              <Col>
                <h4>Longitude:</h4>
                <p>{this.state.location.lon}</p>
              </Col>
              <Col>
                {this.state.weatherData && <Weather weatherData={this.state.weatherData} />}
              </Col>
              <Col>
                {this.state.movieData && <Movies movieData={this.state.movieData} />}
              </Col>
            </Row>
          </div>
        )}

        {this.state.mapUrl !== '' && (
          <div className="mt-3">
            <img src={this.state.mapUrl} alt="Map of city" />
          </div>
        )}
      </div>
    );
  }
}

export default App;