// components/EventDetails.js

import React, { useEffect, useState } from 'react';
import { formatEventData } from '../utils/eventUtils';
import { useParams } from 'react-router-dom';
import '../styles/eventdetails.css'; // Import the CSS file

export const Eventdetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://freedom-firebase-045.onrender.com/details/${id}`)
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
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading event data: {error.message}</p>;
  if (!event) return <p>No event data available.</p>;

  const formattedEvent = formatEventData(event);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="event-detail">
      <h2>{formattedEvent.title}</h2>
      <img src={formattedEvent.image} alt={formattedEvent.title} />
      <p><strong>Description:</strong> {formattedEvent.description}</p>
      <div className="event-meta">
        <p><strong>Date:</strong> {formattedEvent.date}</p>
        <p><strong>Time:</strong> {formattedEvent.time}</p>
        <p><strong>Location:</strong> {formattedEvent.location}</p>
        <p><strong>Price:</strong> {formattedEvent.price}</p>
        <p><strong>Mode:</strong> {formattedEvent.mode}</p>
        <p><strong>Capacity:</strong> {formattedEvent.capacity}</p>
        <p><strong>Status:</strong> {formattedEvent.status}</p>
        <p><strong>Ticket Types:</strong>
          <select>
            {formattedEvent.ticketTypes.split(',').map((type, index) => (
              <option key={index} value={type.trim()}>{type.trim()}</option>
            ))}
          </select>
        </p>
        <p><strong>Comments:</strong> {formattedEvent.comments}</p>
        <p><strong>Ratings:</strong> <span className="star-rating">{renderStars(formattedEvent.ratings)}</span></p>
        <button className='book'>Book Ticket</button>
      </div>
    </div>
  );
};
