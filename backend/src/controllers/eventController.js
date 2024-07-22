

import EventModel from "../models/eventModel.js";
import User from "../models/userModel.js";

const getEvents = async (req, res) => {
    try {
        const events = await EventModel.find();
        res.status(200).json({ events });
    } catch (err) {
        console.error("Error while fetching events:", err);
        res.status(500).json({ error: err.message || "Internal Server Error" });
    }
};


const event = async (req, res) => {
  const { id } = req.params; 
  try {
    const eventData = await EventModel.findOne({ eventPlaner: id });
    if (!eventData) { 
      return res.status(404).json({ error: true, message: "You have not created any event yet" });
    }
    res.status(200).json({eventData });
  } catch (error) {
    console.error("Error fetching event data:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


  

  const getBookedEvent = async (req, res) => {
    const id  =  req.user.userID ;
    try {
      const events = await EventModel.find({ eventBooked: id });
      if (!events) { 
        return res.status(404).json({ error: true, message: "You have not Booked any event yet" });
      }
      res.status(200).json({ error: false, events });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: error.message });
    }
  };
  

  


async function searchEventsByTitle(req, res) {
    try {
        const title = req.query.title; 
        const recipes = await EventModel.find({ title: { $regex: title, $options: "i" } });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const addEvent = async (req, res) => {
    try {
        const { title, description, eventDate, category, imageUrl, mode, time, price, location, ticketTypes,capacity } = req.body;

        const organizer = req.user.username;
        const eventPlaner = req.user.userID;
        const newEvent = new EventModel({ title, description, eventDate, mode, time, organizer, category, imageUrl, eventPlaner, price, location, ticketTypes,capacity });

        const savedEvent = await newEvent.save();

        await User.findOneAndUpdate({ username: eventPlaner }, { $push: { eventsPlanned: savedEvent._id } }, { new: true });
        await User.findByIdAndUpdate(eventPlaner, { $push: { eventsBooked: savedEvent._id } }, { new: true });

        res.status(201).json({ success: true, event: savedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Not able to add Event", error: error.message });
    }
};

const updateEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        res.status(200).json({ success: true, event: updatedEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" ,error: error });
    }
};


const bookTicket = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userID;

    try {
        const event = await EventModel.findById({_id: id});
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }
        if (event.eventBooked.includes(userId)) {
            return res.status(400).json({ success: false, message: "You have already booked this ticket" });
        }
        
        await User.findByIdAndUpdate(userId, { $push: { tickets: id } }, { new: true });

        await EventModel.findByIdAndUpdate(id, { $push: { eventBooked: userId } }, { new: true });

        res.status(200).json({ success: true, message: "Ticket booked successfully" });
    } catch (error) {
        console.error("Error while booking ticket:", error);
        res.status(500).json({ success: false,  error: error });
    }
};


const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        res.status(200).json({ success: true, message: "Event deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error",error: error });
    }
};




const addComment = async (req, res) => {
  const { eventId, userId, comment } = req.body; // Ensure 'comment' is used instead of 'comments'
  try {
      console.log("Received data:", { eventId, userId, comment });

      const event = await EventModel.findById(eventId);
      
      if (!event) {
          return res.status(404).json({ success: false, message: "Event not found" });
      }

      const newComment = {
          user: userId,
          comment // Ensure 'comment' is used instead of 'comments'
      };

      console.log("New Comment:", newComment);  // Debugging statement to verify new comment

      event.comments.push(newComment);
      await event.save();

      res.status(201).json({ success: true, message: "Comment added successfully", comment: newComment });
  } catch (error) {
      console.error("Error posting comment:", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

  const rateEvent = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;
    const userId = req.user.userID;
  
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      const existingRating = event.ratings.find(r => r.user.toString() === userId);
      if (existingRating) {
        existingRating.rating = rating;
      } else {
        event.ratings.push({ user: userId, rating });
      }
  
      await event.save();
  
      res.status(200).json({ success: true, message: "Rating added successfully" });
    } catch (error) {
      console.error("Error adding rating:", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  };
  

  const favoriteEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userID;
  
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      if (event.favorites.includes(userId)) {
        return res.status(400).json({ success: false, message: "Event already marked as favorite" });
      }
  
      event.favorites.push(userId);
      await event.save();
  
      res.status(200).json({ success: true, message: "Event marked as favorite" });
    } catch (error) {
      console.error("Error marking event as favorite:", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  };
  
  //
  const unfavoriteEvent = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userID;
  
    try {
      const event = await EventModel.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, message: "Event not found" });
      }
  
      if (!event.favorites.includes(userId)) {
        return res.status(400).json({ success: false, message: "Event not marked as favorite" });
      }
  
      event.favorites = event.favorites.filter(fav => fav.toString() !== userId);
      await event.save();
  
      res.status(200).json({ success: true, message: "Event unmarked as favorite" });
    } catch (error) {
      console.error("Error unmarking event as favorite:", error);
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  };
  

export { getEvents,  event, addEvent,bookTicket,getBookedEvent, updateEvent, deleteEvent,searchEventsByTitle,addComment,rateEvent,favoriteEvent, unfavoriteEvent };