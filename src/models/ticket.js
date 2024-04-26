import mongoose from "mongoose";



const ticketSchema = mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true, min: 3 },
  ticket_price: { type: Number, required: true },
  departureCity: { type: String, required: true, min: 3 },
  destinationCity: { type: String, required: true, min: 3 },
  destinationCityPhotoUrl: { type: String, required: true, min: 6 },
  
});

export default mongoose.model("Ticket", ticketSchema)