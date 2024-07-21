// utils/eventUtils.js

export function formatEventData(event) {
    return {
      eventPlaner: event.eventPlaner || 'Id not fond',
      title: event.title || 'No Title Available',
      image: event.imageUrl && event.imageUrl.length > 0 ? event.imageUrl[0] : 'No Image Available',
      description: event.description || 'No Description Available',
      date: event.eventDate || 'No Date Available',
      time: event.time || 'No Time Available',
      location: event.location || 'No Location Available',
      price: event.price !== undefined ? `$${event.price.toFixed(2)}` : '$No Price Available',
      mode: event.mode || 'No Mode Available',
      capacity: event.capacity !== undefined ? event.capacity : 'No Capacity Available',
      status: event.status || 'No Status Available',
      ticketTypes: event.ticketTypes && event.ticketTypes.length > 0 ? event.ticketTypes.join(', ') : 'No ticket types available.',
      comments: event.comments && event.comments.length > 0 ? event.comments.map(comment => comment.comment).join(', ') : 'No comments yet.',
      ratings: event.ratings && event.ratings.length > 0 ? event.ratings.map(rating => `User ${rating.user}: ${rating.rating}`).join(', ') : 'No ratings yet.'
    };
  }
  