import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Movies(props) {
    return (
        <>
            {props.movieData && props.movieData.length > 0 && (
                <CardGroup className="text-white">
                    {props.movieData.map((movie, index) => (
                        <Card key={index} id={`Movie${index + 1}`} border="dark">
                            <Card.Img variant="top" src={movie.image_url} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>{movie.overview}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
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
