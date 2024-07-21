// components/EventDetail.js

import React, { useEffect, useState } from 'react';
import { formatEventData } from '../utils/eventUtils';
import { useParams } from 'react-router-dom';

export const Eventdetails = () => {
  const { eventPlaner } = useParams(); 
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (eventPlaner) {
      fetch(`https://freedom-firebase-045.onrender.com/events/${eventPlaner}`)
        .then(response => response.json())
        .then(data => {
          setEvent(data.event); // Adjust according to your API response structure
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    } else {
      setError(new Error('No event ID provided.'));
      setLoading(false);
    }
  }, [eventPlaner]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event data: {error.message}</p>;
  if (!event) return <p>No event data available.</p>;

  const formattedEvent = formatEventData(event);

  return (
    <div className="event-detail">
      <h2>{formattedEvent.title}</h2>
      <img src={formattedEvent.image} alt={formattedEvent.title} />
      <p><strong>Description:</strong> {formattedEvent.description}</p>
      <p><strong>Date:</strong> {formattedEvent.date}</p>
      <p><strong>Time:</strong> {formattedEvent.time}</p>
      <p><strong>Location:</strong> {formattedEvent.location}</p>
      <p><strong>Price:</strong> {formattedEvent.price}</p>
      <p><strong>Mode:</strong> {formattedEvent.mode}</p>
      <p><strong>Capacity:</strong> {formattedEvent.capacity}</p>
      <p><strong>Status:</strong> {formattedEvent.status}</p>
      <p><strong>Ticket Types:</strong> {formattedEvent.ticketTypes}</p>
      <p><strong>Comments:</strong> {formattedEvent.comments}</p>
      <p><strong>Ratings:</strong> {formattedEvent.ratings}</p>
    </div>
  );
};



