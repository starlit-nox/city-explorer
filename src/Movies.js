import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './App.css';


// this is the start of the movie api's function
function Movies(props) {
    return (
        // <> is essentially shorthand for div, it works better in react
        <>
        {/* this is checking the movieDaa prop to see if it exists */}
        {/* if the movieData's length is greater than 0 it's true and the data will be rendered */}
            {props.movieData && props.movieData.length > 0 && (
                // CardGroup is bs and its for the css
                <CardGroup className="text-white">
                    {/* this is lopping through the movieData array's objects*/}
                    {/* when rendered, bc in cardgroup, each object (data from the array) will be rendered in its own card component */}
                    {props.movieData.map((movie, index) => (
                        <Card className="custom-class" key={index} id={`Movie${index + 1}`} border="dark">
                            <Card.Img variant="top" src={movie.image_url} />
                            <Card.Body>
                                {/* this is displaying the movie's title */}
                                <Card.Title>{movie.title}</Card.Title>
                                {/* this is displaying the movie's description */}
                                <Card.Text>{movie.overview}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    {/* this displaying when the movie was released (the date) */}
                                    Released: {movie.released_on}
                                </small>
                            </Card.Footer>
                        </Card>
                    ))}
                </CardGroup>
            )}
        </>
    );
}

export default Movies;
// epxorting the Movies component