import express from 'express';
import { adminController, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter= express.Router();

adminRouter.post("/login",adminController)
adminRouter.get("/comments", auth, getAllComments)
adminRouter.get("/blogs", auth, getAllBlogsAdmin)
adminRouter.post("/delete-comments", auth, deleteCommentById)
adminRouter.post("/approve-comments", auth, approveCommentById)
adminRouter.get("/dashboard", auth, getDashboard)


export default adminRouter;