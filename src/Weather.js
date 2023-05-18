import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Weather(props) {
    return (
        <>
            <CardGroup>
                <Card id="Day1">
                    <Card.Title>
                        {props.locateWeather[0]?.valid_data}
                    </Card.Title>
                    <Card.Text>
                        {props.locateWeather[0]?.description}
                    </Card.Text>
                    <Card.Footer>
                        <small className="text-muted">Day 1</small>
                    </Card.Footer>
                </Card>
            </CardGroup>

            <CardGroup>
                <Card id="Day2">
                    <Card.Title>
                        {props.locateWeather[1]?.valid_data}
                    </Card.Title>
                    <Card.Text>
                        {props.locateWeather[1]?.description}
                    </Card.Text>
                    <Card.Footer>
                        <small className="text-muted">Day 2</small>
                    </Card.Footer>
                </Card>
            </CardGroup>

            <CardGroup>
                <Card id="Day3">
                    <Card.Title>
                        {props.locateWeather[2]?.valid_data}
                    </Card.Title>
                    <Card.Text>
                        {props.locateWeather[2]?.description}
                    </Card.Text>
                    <Card.Footer>
                        <small className="text-muted">Day 3</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </>
    )
}

export default Weather;