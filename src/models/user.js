import mongoose from "mongoose";


const capitalizedSentence =(string)=>{
  return string.charAt(0).toUpperCase()+string.slice(1)
};  
  
//console.log(capitalizedSentence); 

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const validatePassword=function(password){
const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
return re.test(password); 
}

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { 
    type: String,
    required: true,
    set:capitalizedSentence,
   
   
  },
  
    email: {
      type: String,required: true,
      trim: true,
      validate:[validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
     
    },
  password: { type: String,
  
    required: true,
    validate: [validatePassword, "Please fill a valid password"],
    match: [
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Please fill a valid password",
    ],
  money_balance: { type: Number,required: true},
  bought_tickets: { type: Array,required: true },
}
})

export default mongoose.model("User", userSchema);