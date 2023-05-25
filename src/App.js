import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';
// importing the css component
import './App.css';
// importing the weather component
import Weather from './Weather';
// importing the movie component
import Movies from './Movies';

// this is setting the app as a class
// each state is set to null bc it lets the component easily check to see if the data has been fetched & stored yet
// setting it to null means it hasn't been fetched yet
// consider it the starting point
class App extends Component {
  state = {
    searchquery: ``,
    location: { lat: null, lon: null, display_name: null },
    mapUrl: ``,
    forecast: null,
    movies: null,
    error: null
  };

  // Function to fetch location data and weather/movies information
  getLocation = async () => {
    try {
      // this gets the location information using the LocationIQ API
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_CITY_KEY}&q=${this.state.searchquery}&format=json`;
      const res = await axios.get(API);
      // this is getting the data from axios response's array (which start at 0)
      const { lat, lon, display_name } = res.data[0];

      // this gets weather information using the weather API
      // its attached to the render link and asking for the params for the lat, lon, and cityname
      // city name is found thru the search query
      const weatherAPI = `https://city-explorer-lgyr.onrender.com/weather?lat=${lat}&lon=${lon}&city_name=${this.state.searchquery}`;
      const weatherRes = await axios.get(weatherAPI);

      // this updates the state with location, map URL, and weather data
      this.setState({
        location: { lat, lon, display_name },
        mapUrl: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_CITY_KEY}&center=${lat},${lon}`,
        forecast: weatherRes.data
      });

      // this gets movies information using the movie API
      // its attached to the render link and asking for the params for the search
      const movieAPI = `https://city-explorer-lgyr.onrender.com/movies?searchquery=${this.state.searchquery}`;
      // axios is the middleware between the moviesAPI to the frontend
      const movieRes = await axios.get(movieAPI);

      // Update the state with movies data and reset any previous error
      this.setState({ movies: movieRes.data, error: null });
    } catch (error) {
      // Handle any errors that occur during API calls
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
              {/* this button is a boostrap */}
              {/* onclick is the event handler calling the getLocation function */}
              <Button variant="primary" onClick={this.getLocation}>
                Explore!
              </Button>
            </Col>
          </Form.Group>
        </Form>
{/* this is checking to see if the params of location are null, if they're not then the api will pull the params's data */}
        {this.state.location.lat !== null && this.state.location.lon !== null && (
          <div className="mt-3">
            <h3>The city is: {this.state.location.display_name}!</h3>
            <Row>
              <Col>
                <h4>Latitude:</h4>
                {/* getting the weather api's lat */}
                <p>{this.state.location.lat}</p>
              </Col>
              <Col>
                <h4>Longitude:</h4>
                {/* getting the weather api's lon */}
                <p>{this.state.location.lon}</p>
              </Col>
              {/* this is setting the state for forecast */}
              {/* this information is gotten from the Weather component */}
              {/* the state's info is coming from the forecast function (located in the City-Explorer-API) */}
              <Col>{this.state.forecast && <Weather weatherData={this.state.forecast} />}</Col>
              {/* this is setting the state for movies */}
              {/* this information is gotten from the Movies component */}
              {/* the state's info is coming from the movies function (located in the City-Explorer-API) */}
              <Col>{this.state.movies && <Movies movieData={this.state.movies} />}</Col>
            </Row>
          </div>
        )}

{/* this is checking the mapURL prop to see if its an empty string or not */}
{/* if the string isn't empty, it'll be registered as true and render the map */}
        {this.state.mapUrl !== '' && (
          <div className="mt-3">
            {/* this is the information which is rendered from the state checking*/}
            <img src={this.state.mapUrl} alt="Map of city" />
          </div>
        )}
{/* if its false, it'll give an error */}
        {this.state.error && <p>An error occurred while fetching data.</p>}
      </div>
    );
  }
}

export default App;
// Exporting the App component
