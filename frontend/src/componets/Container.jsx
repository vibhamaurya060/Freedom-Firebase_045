// src/pages/EventsPage.js

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample event data
const events = [
  {
    _id: "6698c4cdf29afb90abbc96dc",
    title: "Tech Conference 2024",
    description: "An annual tech conference with talks from industry leaders.",
    eventDate: "2024-09-15",
    organizer: "admin",
    category: "Technology",
    imageUrl: [
      "https://a.storyblok.com/f/188325/1920x1280/41e681c422/alexandre-pellaes-6vajp0pscx0-unsplash-1-1.jpg",
    ],
    eventPlaner: "6698bc4cdaf588607d8fd9f7",
    eventBooked: [],
    time: "10:00 AM",
    mode: "Online",
    price: 99.99,
    location: "San Francisco, CA",
    ticketTypes: ["Bronze", "Silver", "Gold"],
    favorites: [],
    status: "upcoming",
    capacity: 500,
    attendees: [],
    comments: [],
    ratings: [],
  },
  {
    _id: "669935289b0162c528ef18bd",
    title: "Music Festival 2024",
    description:
      "A thrilling music festival featuring top artists from around the world.",
    eventDate: "2024-11-15",
    organizer: "admin",
    category: "Music",
    imageUrl: [
      "https://c8.alamy.com/comp/PC6KFM/live-music-background-drumset-on-stage-concert-and-show-entertainment-drum-on-stage-and-festive-event-PC6KFM.jpg",
    ],
    eventPlaner: "6698bc4cdaf588607d8fd9f7",
    eventBooked: [],
    time: "2:00 PM",
    mode: "Offline",
    price: 199.99,
    location: "Miami, FL",
    ticketTypes: ["General Admission", "VIP", "Super VIP"],
    favorites: [],
    status: "upcoming",
    capacity: 5000,
    attendees: [],
    comments: [],
    ratings: [],
  },
  {
    _id: "6699411fcc9e32f4a35596bc",
    title: "Health Summit 2024",
    description: "A comprehensive summit focusing on health and wellness.",
    eventDate: "2024-10-05",
    organizer: "admin",
    category: "Health",
    imageUrl: [
      "https://www.oakstone-productions.com/uploads/large_Eventfilm_Eit_summit_Kurzversion_thumbnail_22ace3c735.jpg",
    ],
    eventPlaner: "6698bc4cdaf588607d8fd9f7",
    eventBooked: [],
    time: "9:00 AM",
    mode: "Online",
    price: 79.99,
    location: "Los Angeles, CA",
    ticketTypes: ["Basic", "Premium", "VIP"],
    favorites: [],
    status: "upcoming",
    capacity: 800,
    attendees: [],
    comments: [],
    ratings: [],
  },
  {
    _id: "669942a4cc9e32f4a35596c1",
    title: "Startup Expo 2024",
    description:
      "An expo showcasing the most innovative startups and tech companies.",
    eventDate: "2024-08-10",
    organizer: "admin",
    category: "Business",
    imageUrl: [
      "https://is360expo.com/wp-content/uploads/2021/06/Startup-Expo.jpg",
      "https://indienergy.in/wp-content/uploads/2023/05/WhatsApp-Image-2023-06-27-at-17.59.12-1024x682.jpeg",
    ],
    eventPlaner: "6698bc4cdaf588607d8fd9f7",
    eventBooked: [],
    time: "10:00 AM",
    mode: "Hybrid",
    price: 99.99,
    location: "San Francisco, CA",
    ticketTypes: ["Early Bird", "Standard", "VIP"],
    favorites: [],
    status: "upcoming",
    capacity: 2000,
    attendees: [],
    comments: [],
    ratings: [],
  },
  {
    _id: "6699434bcc9e32f4a35596c6",
    title: "Art Exhibition 2024",
    description: "An exhibition of contemporary art by leading artists.",
    eventDate: "2024-12-01",
    organizer: "admin",
    category: "Art",
    imageUrl: [
      "https://media.licdn.com/dms/image/C5612AQFSdMT3Uz9Omg/article-cover_image-shrink_600_2000/0/1520080900060?e=2147483647&v=beta&t=BZk-G72_DjKh1BcIdT83f8PcO-bFd-oZAmnkhUFaZU4",
    ],
    eventPlaner: "6698bc4cdaf588607d8fd9f7",
    eventBooked: [],
    time: "1:00 PM",
    mode: "Offline",
    price: 50,
    location: "Chicago, IL",
    ticketTypes: ["General Admission", "VIP", "Super VIP"],
    favorites: [],
    status: "upcoming",
    capacity: 1000,
    attendees: [],
    comments: [],
    ratings: [],
  },
];

const EventCard = ({ event }) => {
  // Ensure event.imageUrl is an array and has at least one image URL
  const imageUrl =
    event.imageUrl && event.imageUrl.length > 0
      ? event.imageUrl[0]
      : "https://via.placeholder.com/150";

  return (
    <div className="col-12 col-sm-6 col-md-4 mb-4">
      <div className="card">
        <img
          src={imageUrl}
          alt={event.title}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }} // Set the height and ensure the image fits well
        />
        <div className="card-body">
          <h5 className="card-title">{event.title}</h5>
          <p className="card-text">{event.description}</p>
          <p className="card-text">
            <small className="text-muted">
              {event.eventDate} | {event.time} | {event.location}
            </small>
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${event.price}
          </p>
          <p className="card-text">
            <strong>Capacity:</strong> {event.capacity}
          </p>
        </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
