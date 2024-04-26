import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
//import TicketModel from "../models/ticket.js";
import jwt from "jsonwebtoken";
//import cookieParser from "cookie-parser";



const SIGN_UP = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userData = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password: hash,
      money_balance:req.body.money_balance,
      bought_tickets: [],
    };

    const newUser = new UserModel(userData);
    const response = await newUser.save();

    return res.status(200).json({ user: response,message: "user registreted successfully"  });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};


const LOG_IN = async (req, res) => {
  
  try {
    // tikriname, ar toks useris yra
    const user = await UserModel.findOne({ email: req.body.email });
    // jei tokio userio nera, graziname errora
    if (!user) {
      return res.status(401).json({ message: "user data is bad" });
    }
    // tikriname, ar userio passwordas geras? tikrinama sinchroniniu budu
    const isPasswordMatch = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({ message: "user data is bad" });
    }

  

    // kuriame java web tokena - jasonwebtoken lib. pagal user emaila ir id
    const jwt_token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    console.log(user);

    const jwt_refresh_token = jwt.sign({
      email:user.email,user_id:user.id
   }, process.env.REFRESH_TOKEN_SECRET, 
   { expiresIn: '1d' });
    return res.status(200).json({ jwt: jwt_token,jwt_refresh_token, message: "user logged in successfully" });
  } 
  catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(404).json({ message: "error happend" });
  }
};

const REFRESH_TOKEN=  async (req, res) => {   

     // Creating refresh token not that expiry of refresh 
        //token is greater than the access token
  
    const jwt_refresh_token =req.headers.authorization;
    if(!jwt_refresh_token){
      return res.status(406).json({message:"No refresh token"});

    }
    try{
    jwt.verify(jwt_refresh_token,
      process.env.REFRESH_TOKEN_SECRET,{expiresIn:"1d"})


      
        const jwt_token = jwt.sign({
         email:userEmail,user_id:user_id
      }, process.env.JWT_SECRET, 
      { expiresIn: '2h' });

      /* Assigning refresh token in http-only cookie 
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None', secure: true,
        maxAge: 24 * 60 * 60 * 1000
    });*/
    

    return res.status(200).json({ jwt: jwt_token,jwt_refresh_token, message: "user logged in successfully" });
  }
   catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }

};

const GET_ALL_USERS = async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.json({ users: users });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};


const GET_USER_BY_ID = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    //const user = await UserModel.find(req.body.userId);

    if (!user) {
      return res.status(405).json({ message: "User not exist" });
    }

    return res.status(200).json({ user: user });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};



const USERS_BY_ID_WITH_TICKETS = async (req, res) => {
  try {
    const userId=req.params.userId;
    const userWithTickets = await UserModel.aggregate([
     { $match: {userId:userId}
    },
      {
        $lookup: {
          from: "tickets",
          localField: "boughtTickets",
          foreignField: "_id",
          as: "boughtTickets",
        },
      },
    ])
     /* { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
    .exec();*/
    if(!userWithTickets|| userWithTickets.length ===0 ) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ user:userWithTickets[0]  });
  } catch (err) {
    console.log("HANDLED ERROR: ", err);
    return res.status(500).json({ message: "error happend" });
  }
};








export { 
  SIGN_UP,
  LOG_IN,
  REFRESH_TOKEN,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  
  USERS_BY_ID_WITH_TICKETS 
}