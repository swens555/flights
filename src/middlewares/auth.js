import jwt from "jsonwebtoken";
//import cookieparser from "cookie-parser";

const authUser = (req, res,next) => {
 /* const refreshToken= req.headers.authorization;
//if (req.cookies?.jwt) {
 
        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.jwt;
 
        // Verifying refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
 
                    // Wrong Refesh Token
                    return res.status(406).json({ message: 'Unauthorized' });
                }
                else {
                    // Correct token we send a new  token*/
                    const token = req.headers.authorization;
                    if (!token) {
                      return res.status(401).json({ message: "user is not authenticated" });
                    }
                    // decryptiname duomenis
                    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                      if (err) {
                        return res.status(401).json({ message: "user is not authenticated" });
                      }
                  
                      req.body.userId = decoded.user_id;
                  
                      return next();
                    });
                  };
                   // return res.json({ token }); });}}
                 
                  
                
                
        /* else {
            return res.status(406).json({ message: 'Unauthorized' });
        }
    }



 /*const refreshToken=req.headers.authorization;

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "user is not authenticated" });
  }
  // decryptiname duomenis
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "user is not authenticated" });
    }

    req.body.userId = decoded.user_id;

    return next();
  });
};





/*const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(8080)*/

export default authUser;