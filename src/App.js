import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
import './App.css';
import Weather from './Weather';
import Movies from './Movies';

class App extends Component {
  state = {
    searchquery: ``,
    location: { lat: null, lon: null, display_name: null },
    mapUrl: ``,
    forecast: null,
    movies: null,
    error: null
  };

  getLocation = async () => {
    try {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchquery}&format=json`;
      const res = await axios.get(API);
      const { lat, lon, display_name } = res.data[0];

      const weatherAPI = `https://city-explorer-lgyr.onrender.com/weather?lat=${lat}&lon=${lon}&city_name=${this.state.searchquery}`;
      const weatherRes = await axios.get(weatherAPI);
      this.setState({
        location: { lat, lon, display_name },
        mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${lat},${lon}`,
        forecast: weatherRes.data
      });

      const movieAPI = `https://city-explorer-lgyr.onrender.com/movies?searchquery=${this.state.searchquery}`;
      const movieRes = await axios.get(movieAPI);
      this.setState({ movies: movieRes.data, error: null });
    } catch (error) {
      this.setState({ error });
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
              <Col>{this.state.forecast && <Weather weatherData={this.state.forecast} />}</Col>
              <Col>{this.state.movies && <Movies movieData={this.state.movies} />}</Col>
            </Row>
          </div>
        )}

        {this.state.mapUrl !== '' && (
          <div className="mt-3">
            <img src={this.state.mapUrl} alt="Map of city" />
          </div>
        )}

        {this.state.error && <p>An error occurred while fetching data.</p>}
      </div>
    );
  }
}

export default App;
