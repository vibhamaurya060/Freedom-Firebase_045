import React, { useEffect, useState } from 'react';
import eventBanner from '../../src/assets/eventBanner.jpeg';
import '../styles/find.css'; 
import axios from 'axios';

export const Find = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get("https://freedom-firebase-045.onrender.com/events");
        console.log('API Response:', response.data);

        // Assuming the API response contains an array of events
        setEvents(response.data.events);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchEventData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="banner-container">
        <img src={eventBanner} alt="Event Banner" className="banner-image" />
      </div>
      <div className="search-container">
        <h1>Explore And Book Events</h1>
        <input
          type="text"
          placeholder="Search for events..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <img src={event.imageUrl[0]} alt={event.title} className="event-image" />
            <h5>{event.title}</h5>
            <h6>Location: {event.location}</h6>
            <p>{event.description}</p>
            <button className="details-button">Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};
