import express from'express';
import EventModel from '../models/eventModel.js';
const detailRouter = express.Router();

// Route to fetch event details by _id
detailRouter.get('/:id', async (req, res) => {
  try {
    const event = await EventModel.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json({ event });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default detailRouter;