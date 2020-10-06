import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js'

router.post('/login', authUser);
router.route('/profile').get(getUserProfile)
router.route('/register').post(registerUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

export default router
