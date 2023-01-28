
import express from 'express';
import { singup, login} from '../controllers/UserController.js'

const route = express.Router();

route.post('/singup', singup);
route.post('/login', login);

export default route;