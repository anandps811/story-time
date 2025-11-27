import { Express, Router } from "express";
import router from "express"
import { createUser, UserLogin} from "../controllers/user.controller";


const userrouter: Router = router.Router();
userrouter.post('/register', createUser)
userrouter.post('/login', UserLogin)

export default userrouter;