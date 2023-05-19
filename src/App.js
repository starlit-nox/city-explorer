import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import './App.css';
import Weather from './Weather';

class App extends Component {
  state = {
    searchquery: '',
    location: { lat: null, lon: null, display_name: null },
    mapUrl: '',
    weatherData: null
  };

  // getting the weather from server.js
  setWeather = (val) => {
    this.setState({ weatherData: val });
  };

  // make a variable for the API call to determine whether to use the host or the localhost
  getWeather = async (e) => {
    const useLocalhost = false; // Set this flag to true or false based on your logic

    const host = 'https://city-explorer-lgyr.onrender.com';
    const localhost = 'http://localhost:3003';

    const baseAPI = useLocalhost ? localhost : host;
    const API = `${baseAPI}/weather=${e.target.value}`;

    try {
      let response = await axios.get(API).then((res) => {
        this.setWeather(response.data);
      });
    } catch (e) {
      // Handle the error here
    }
  };

  // this is where you put the API key
  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_MAP_KEY}&q=${this.state.searchquery}&format=json`;
    const res = await axios.get(API);
    const { lat, lon, display_name } = res.data[0];
    this.setState({ location: { lat, lon, display_name } });

    const mapAPI = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_MAP_KEY}&center=${lat},${lon}&zoom=13`;
    this.setState({ mapUrl: mapAPI });
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
            {/* the text below is calling the API's name with display_name */}
            <h3>The city is: {this.state.location.display_name}!</h3>
            <Row>
              {/* lat is what it's named in the API, the code below is calling the API */}
              <Col>
                <h4>Latitude:</h4>
                <p>{this.state.location.lat}</p>
              </Col>
              {/* lon is what it's named in the API, the code below is calling the API */}
              <Col>
                <h4>Longitude:</h4>
                <p>{this.state.location.lon}</p>
              </Col>
              <Col>
                {/* Render the Weather component with weatherData prop */}
                {this.state.weatherData && <Weather weatherData={this.state.weatherData} />}
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