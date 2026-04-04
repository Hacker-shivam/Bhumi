import express from 'express'
import {Login, Signup, Logout} from '../controller/Usercontroller.js'

const UserRoute = express.Router();

UserRoute.post('/signup', Signup)
UserRoute.post('/login', Login)
UserRoute.post('/logout', Logout)

export default UserRoute;