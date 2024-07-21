import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import eventBanner from '../../src/assets/eventBanner.jpeg';
import '../styles/find.css'; 
import axios from 'axios';
import { Eventdetails } from './Eventdetails';

export const Find = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9; // Changed from 10 to 9

  const navigate = useNavigate(); // Initialize navigate


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchEventData = async () => {
    try {
      const response = await axios.get("https://freedom-firebase-045.onrender.com/events");
      console.log('API Response:', response.data);

      // Assuming the API response contains an array of events
      setEvents(response.data.events);
      setFilteredEvents(response.data.events);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  const filterEvents = useCallback(debounce((term) => {
    setCurrentPage(1); // Reset to first page on search
    if (term) {
      const filtered = events.filter(event => event.title.toLowerCase().includes(term.toLowerCase()));
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, 300), [events]);

  useEffect(() => {
    filterEvents(searchTerm);
  }, [searchTerm, filterEvents]);

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

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
        {currentEvents.map((event) => (
          <div key={event._id} className="event-card">
            <img src={event.imageUrl[0]} alt={event.title} className="event-image" />
            <h5>{event.title}</h5>
            <h6>Location: {event.location}</h6>
            <p>{event.description}</p>
            <button className="details-button" onClick={() => navigate(`/eventDetails/${event.eventPlaner}`)} >Details</button>
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map(number => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={`page-button ${currentPage === number + 1 ? 'active' : ''}`}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
