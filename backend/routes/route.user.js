import express from 'express';
import { register,login,logout } from '../controllers/Controllers.User.js'; 
import { getMyProfile,getAllAdmin } from '../controllers/Controllers.User.js';
const router = express.Router();

// Define the route
router.post('/register', register);
router.post('/login',login)
router.post('/logout',logout)
router.get('/getMyProfile',getMyProfile)
router.get('/getAllAdmin',getAllAdmin);
// Export the router
export default router;
