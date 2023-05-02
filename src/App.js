import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [searchquery, setSearchQuery] = useState('');
  const [location, setLocation] = useState({});

  useEffect(() => {
    const getLocation = async () => {
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATION_ENV}&q=${searchquery}&format=json`;
      console.log(API);
      const res = await axios.get(API);
      console.log(res.data[0])
      setLocation(res.data[0]);
    };

    if (searchquery) {
      getLocation();
    }
  }, [searchquery]);

  return (
    <>
      <input onChange={(e) => setSearchQuery(e.target.value)} placeholder="search for a city" />
      <button>Explore Location!</button>
      {location.place_id &&
        <h2>The city is: {location.display_name}</h2>
      }
    </>
  );
}

export default App;
