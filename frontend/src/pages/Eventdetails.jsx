// Eventdetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Eventdetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/events/${id}`);
        setEvent(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {event && (
        <>
          <h1>{event.title}</h1>
          <img src={event.imageUrl[0]} alt={event.title} />
          <p>{event.description}</p>
          <h4>Location: {event.location}</h4>
          <h4>Price: ${event.price}</h4>
          <h4>Date: {event.eventDate}</h4>
          <h4>Time: {event.time}</h4>
          <h4>Category: {event.category}</h4>
        </>
      )}
    </div>
  );
};
