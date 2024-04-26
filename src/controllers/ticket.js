//let tickets = [];
import { v4 as uuidv4 } from "uuid";
import TicketModel from "../models/ticket.js";
import UserModel from "../models/user.js";
import user from "../models/user.js";

 const CREATE_TICKET = async (req, res) => {
  try {
    const ticket = new TicketModel({
      id: uuidv4(),
      ...req.body,
    });

    console.log(ticket)

    const response = await ticket.save();

    // await TaskGroupModel.findByIdAndUpdate(req.params.groupId, {
    //   $push: { tasks_ids: task.id },
    // });

    return res
      .status(201)
      .json({ status: "Ticket was added successfully", response: response });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(400).json({ message: "error happend" });
  }
};


  const GET_ALL_TICKETS =async (req, res) => {

    try {
    const tickets = await TicketModel.find();
  
      return res.status(200).json({ tickets: tickets });
    } catch (err) {
      console.log("HANDLED ERROR: ", err);
    return res.status(400).json({ message: "error happend" });
    }
  };
    
  

  const GET_TICKET_BY_ID =async (req, res) => {
    try{
    const ticket = await TicketModel.findById(req.params.id);
  
    if (!ticket) {
      return res
        .status(404)
        .json({ message: "Ticket with such  id was not found" });
    }
  
    return res.status(200).json({ ticket: ticket });
  }
  catch (err) {
    console.log("HANDLED ERROR: ", err);
  return res.status(400).json({ message: "error happend" });
  }
}

  

  const DELETE_TICKET_BY_ID = async (req, res) => {
    try{
      const ticket = await TicketModel.findOne({ id: req.params.id });

      /*if (ticket.userId !== req.body.userId) {
        return res
          .status(401)
          .json({ message: "this ticket does not belong to you" });
      }*/
  
      const response = await TicketModel.deleteOne({ id: req.params.id });
  
    return res
      .status(200)
      .json({ message: `ticket with id: ${req.params.id} was deleted` });
  }
  catch(err) {
    console.log("HANDLED ERROR: ", err);
  return res.status(400).json({ message: "error happend" });
  }
}

const BUY_TICKET=async (req,res)=>{
  try {

    if(!user){
      return res.status(404).json({message:"user not found"})}
     /* if(user.money_balance < ticket.ticket_price)
      return res.status(402).json({message:"too expensiv for you "})
    user.money_balance -=ticket.ticket_price;
    user.bought_tickets.push()*/
   
    const ticket = new TicketModel({
      id: uuidv4(),
      userId: req.body.userId,
      title: req.body.title,
      ticket_price: req.body.ticket_price,
      departureCity: req.body.departureCity,
      destinationCity:req.body.destinationCity,
      destinationCityPhotoUrl: req.body.destinationCityPhotoUrl
    });

    const response = await ticket.save();

    return res
      .status(200)
      .json({ ticket: response, message: "Ticket was added successfully" });
  } catch (err) {
    console.log(err);
    console.log("HANDLED ERROR: ", err);
    return res.status(400).json({ message: "error happend" });
  }
};
  

   
  
 export {
        CREATE_TICKET,
        GET_ALL_TICKETS,
        GET_TICKET_BY_ID,
        
        DELETE_TICKET_BY_ID,
        BUY_TICKET
      
       }