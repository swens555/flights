import express from "express";
import { 
    SIGN_UP,
    LOG_IN ,
    REFRESH_TOKEN,
    GET_ALL_USERS,
    GET_USER_BY_ID,
    //BUY_TICKET,
    USERS_BY_ID_WITH_TICKETS,
} from "../controllers/user.js";
import validation from "../middlewares/validation.js";
import userValidationSchema from "../validationSchema/user.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

// i koki endpointa kreipiesi / kokia funkcija bus aktyvuota

router.post("/users",validation(userValidationSchema), SIGN_UP);
router.post("/users/login", LOG_IN);
router.get("/users/refresh", REFRESH_TOKEN);
router.get("/users",auth, GET_ALL_USERS)
router.get("/users/:id",auth,GET_USER_BY_ID)
//router.post("/users/tickets",auth,BUY_TICKET)
router.get("/users/ticket/:id/",auth,USERS_BY_ID_WITH_TICKETS)



// ===jei eksportuotume keleta dalyku, sintaxe butu {assas, asas, asas...}
// export { router };
// arba:

export default router;