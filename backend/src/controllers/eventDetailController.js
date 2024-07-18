import EventModel from "../models/eventModel.js";

const getEventDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await EventModel.findById(id)
            .populate("comments.user", "username")
            .populate("ratings.user", "username")
            .populate("favorites", "username")
            .populate("attendees", "username");
        
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        res.status(200).json({ success: true, event });
    } catch (error) {
        console.error("Error fetching event details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export { getEventDetail };
