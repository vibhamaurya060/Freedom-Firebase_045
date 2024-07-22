import express from 'express';
import { addComment, addEvent, bookTicket, deleteEvent, event, favoriteEvent, getBookedEvent, getEvents, rateEvent, searchEventsByTitle, unfavoriteEvent, updateEvent } from '../controllers/eventController.js';
import auth from '../middlewares/auth.js';
import access from '../middlewares/access.js';
//import { getEventDetail } from '../controllers/eventDetailController.js';


const eventRouter = express.Router();

eventRouter.get('/', getEvents);

eventRouter.get('/:id', event);

eventRouter.get('/search', searchEventsByTitle);
eventRouter.post('/bookTicket/:id',auth,bookTicket)
eventRouter.get('/getEventsBooked',auth, getBookedEvent)
eventRouter.post('/',auth, access('eventPlanner', 'admin'), addEvent);
eventRouter.patch('/:id',auth, access('eventPlanner', 'admin'), updateEvent);
eventRouter.delete('/:id',auth, access('eventPlanner', 'admin'), deleteEvent);
eventRouter.post('/comment', auth, addComment);
eventRouter.post('/rate/:id', auth, rateEvent);
eventRouter.post('/favorite/:id', auth, favoriteEvent);
eventRouter.delete('/favorite/:id', auth, unfavoriteEvent);

// // event details
// eventRouter.get('/:id', getEventDetail);
export default eventRouter;