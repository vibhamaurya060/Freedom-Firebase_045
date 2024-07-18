import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: String, required: true },
    organizer: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: [String] },
    eventPlaner: { type: String, required: true },
    eventBooked: { type: [String] },
    time: { type: String },
    mode: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    ticketTypes: {
      type: [{ type: String }],
      default: function () {
        return ["Bronze"];
      }
    },
    comments: [CommentSchema],
    ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, rating: { type: Number, min: 1, max: 5 } }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
    capacity: { type: Number, required: true },
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }]
  },
  { versionKey: false }
);

const EventModel = mongoose.model("event", EventSchema);

export default EventModel;
