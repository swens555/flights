import Joi from "joi";
const userValidationSchema = Joi.object({
    name:Joi.string().regex(/^[A-Z]+$/).uppercase(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().regex( /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).min(7).required().strict(),
    money_balance: Joi.number().required(),
  });



/*const validateData = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
  
      if (error) {
        console.log(error);
        res.status(400).json({ message: "Bad data" });
      } else {
        next();
      }
    };
  };
  
  const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };

 const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; 

 const capitalizeFirstLetter = (name) => {
  
    for (let i = 0; i < name.length; i++) {
        //const name = words[i];
        if (name) {
            result += name.charAt(0).toUpperCase() + name.slice(1);
        }
        if (i < name.length - 1) {
            result += ' ';
        }
    }

    return result;
};*/
export default userValidationSchema;