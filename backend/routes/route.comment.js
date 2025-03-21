import express from 'express';
import { addComment, getComment } from '../controllers/Controllers.Comment.js';
const router=express.Router();

router.get('/blogs/:id/getComment',getComment);
router.post('/blogs/:id/addComment', addComment);
export default router;
