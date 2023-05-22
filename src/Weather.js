import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Weather(props) {
    return (
        <>
            {props.weatherData && props.weatherData.length >= 3 && (
                <>
                    <CardGroup>
                        <Card id="Day1" border="dark">
                            <Card.Title>{props.weatherData[0].date}</Card.Title>
                            <Card.Text>{props.weatherData[0].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 1</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>

                    <CardGroup>
                        <Card id="Day2" border="dark">
                            <Card.Title>{props.weatherData[1].date}</Card.Title>
                            <Card.Text>{props.weatherData[1].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 2</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>

                    <CardGroup>
                        <Card id="Day3" border="dark">
                            <Card.Title>{props.weatherData[2].date}</Card.Title>
                            <Card.Text>{props.weatherData[2].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 3</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                </>
            )}
        </>
    );
}

export default Weather;
