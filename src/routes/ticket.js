import express from"express";
import {
  
  CREATE_TICKET,
  GET_ALL_TICKETS,
  GET_TICKET_BY_ID,
 
  DELETE_TICKET_BY_ID,
  BUY_TICKET
  
 
  
}from"../controllers/ticket.js";
import auth from "../middlewares/auth.js";
import validation from "../middlewares/validation.js";
import validationSchema from "../validationSchema/ticket.js";


const router = express.Router();


router.post("/tickets",validation(validationSchema),auth, CREATE_TICKET);
router.get("/tickets", auth,GET_ALL_TICKETS);
router.get("/tickets/:id",auth, GET_TICKET_BY_ID);
//router.post("/tickets",auth, INSERT_TICKET);
router.delete("/tickets/:id",auth, DELETE_TICKET_BY_ID);
router.post("/tickets/users",auth,BUY_TICKET)




export default router