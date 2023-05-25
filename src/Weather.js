import React from 'react';
import Card from 'react-bootstrap/Card';
// IMPORTANT FOR CSS: class names for the card is custom-class
// the Card sets the props into cards, improted with bs
import CardGroup from 'react-bootstrap/CardGroup';
// the CardGroup sets the cards into groups, imported with bs
import './App.css';

function Weather(props) {
    return (
        <>
        {/* this is going through the weatherData's array for the props */}
        {/* its checking if the prop's length is greater > than 3 */}
        {/* if it is, the weatherData is true and it'll render the data (date and description)*/}
            {props.weatherData && props.weatherData.length >= 3 && (
                // using <> instead of <div> because I heard somewhere that its better syntax for divs in React
                <>
                 {/* this is the group set for day 1 */}
                    <CardGroup className="text-white">
                        <Card className="custom-class" id="Day1" border="dark">
                            {/* property weatherData is pulling the first date and description out of the api's array */}
                            <Card.Title>{props.weatherData[0].date}</Card.Title>
                            <Card.Text>{props.weatherData[0].description}</Card.Text>
                            <Card.Footer>
                                {/* small is setting the text to be smaller in the className for the days */}
                                <small className="text-muted">Day 1</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
{/* this is the group set for day 2 */}
                    <CardGroup className="text-white">
                        <Card className="custom-class" id="Day2" border="dark">
                            <Card.Title>{props.weatherData[1].date}</Card.Title>
                            <Card.Text>{props.weatherData[1].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 2</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
{/* this is the group set for day 3 */}
                    <CardGroup className="text-white">
                        <Card className="custom-class" id="Day3" border="dark">
                            <Card.Title>{props.weatherData[2].date}</Card.Title>
                            <Card.Text>{props.weatherData[2].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 3</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
{/* this is the group set for day 4 */}
                    <CardGroup className="text-white">
                        <Card className="custom-class" id="Day4" border="dark">
                            <Card.Title>{props.weatherData[2].date}</Card.Title>
                            <Card.Text>{props.weatherData[2].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 4</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
{/* this is the group set for day 5 */}
                    <CardGroup className="text-white">
                        <Card className="custom-class" id="Day5" border="dark">
                            <Card.Title>{props.weatherData[2].date}</Card.Title>
                            <Card.Text>{props.weatherData[2].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 5</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
{/* this is the group set for day 6 */}
                    <CardGroup className="text-white">
                        <Card className="custom-class" id="Day6" border="dark">
                            <Card.Title>{props.weatherData[2].date}</Card.Title>
                            <Card.Text>{props.weatherData[2].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 6</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
{/* this is the group set for day 7 */}
                    <CardGroup className="text-white">
                        <Card className="custom-class" id="Day7" border="dark">
                            <Card.Title>{props.weatherData[2].date}</Card.Title>
                            <Card.Text>{props.weatherData[2].description}</Card.Text>
                            <Card.Footer>
                                <small className="text-muted">Day 7</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                </>
            )}
        </>
    );
}

export default Weather;
// exporting the Weather component
