import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import cookieparser from "cookie-parser";

import ticketRouter from "./src/routes/ticket.js";
//import taskGroupRouter from "./src/routes/ticket_group.js";
import userRouter from "./src/routes/user.js";

const app = express();

app.use(cors());

app.use(express.json());

//app.use(cookieparser());

//app.use(express.urlencoded({ extended: false }));

// PRIES endpointus BUTINAI:

mongoose

  // pirma procesinam prisijungimo duomenis is env:
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log("err:", err);
  });

// ===================po visu konfigutaciju panaudojame taskRouteri
app.use(ticketRouter);
app.use(userRouter);
//app.use(ticketGroupRouter);

app.use((req, res) => {
  return res.status(404).json({ status: "Endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`APP ALIVE AND RUNNING ON PORT ${process.env.port}`);
});