import express from 'express';
import { loginUser, myProfile, verifyUser } from '../controllers/userContoller.js';
import { isAuth } from '../middlewares/auth.js';

const route = express.Router();


route.post('/auth',loginUser);
route.post('/verify',verifyUser);
route.get('/me',isAuth,myProfile);


export default route;