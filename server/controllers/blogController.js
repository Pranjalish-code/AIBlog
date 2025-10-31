
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import mongoose from "mongoose";
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';


export const addBlog=async(req,res)=>{
    try{
        const { title,subTitle,description, category, isPublished } =JSON.parse(req.body.blog);
        const imageFile=req.file;

        //check if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({
                success:false,
                message:"All fields are required"
            });
        }

        const fileBuffer = imageFile.buffer;

        //Upload image to ImageKit
        const response=await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/blogs"
        });

        //Optimize image URL
        const optimizedImageUrl=imagekit.url({
            src:response.url,
            transformation:[{
                quality:"auto",
                format:"webp",
                height:"300",
                width:"1280"
            }]
        });

        const image=optimizedImageUrl;
        await Blog.create({ title, subTitle, description, category, image, isPublished });
        res.json({
            success:true,
            message:"Blog added successfully"
        });

    } catch(error){
        res.json({
            success:false,
            message:"Server error",
            error:error.message
        });
    }
}

export const getAllBlogs=async(req,res)=>{
    try{
        const blogs=await Blog.find({isPublished:true}).sort({createdAt:-1})
        res.json({
            success:true,
            blogs
        });
    }
    catch(error){
        res.json({
            success:false, message:"Server error"})
    }
}

export const getBlogById=async(req,res)=>{
    try{
        const { blogId }=req.params;
        const blog=await Blog.findById(blogId);
        if(!blog){
            return res.json({success:false, message:"Blog not found"});
        }
        res.json({ success:true, blog });
    } catch(error){
        res.json({ success:false, message:error.message });
    }
}

export const deleteBlogById=async(req,res)=>{
    try{
        const { blogId }=req.body;
        if (!blogId) {
      return res.json({ success: false, message: "Blog ID missing" });
    }
        await Blog.findByIdAndDelete(blogId);
        await Comment.deleteMany({ blog:blogId });
        res.json({ success:true, message:"Blog deleted successfully" });
    } catch(error){
        res.json({ success:false, message:error.message });
    }
}


// export const togglePublish=async(req,res)=>{
//     try{
//         const { blogId }=req.params;
//         const blog=await Blog.findById(blogId);
//         blog.isPublished=!blog.isPublished;
//         await blog.save();
//         res.json({ success:true, message:"Blog publish status toggled successfully" });
//     } catch(error){
//         res.json({ success:false, message:error.message });
//     }
// }


export const togglePublish = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    res.json({ success: true, message: "Blog publish status toggled successfully", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const addComment=async(req,res)=>{
  try {
    const { blog, name, content } = req.body;
    await Comment.create({ blog, name, content });
    res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const getBlogComments=async(req,res)=>{
    try{
        const { blogId }=req.body;
        const comments=await Comment.find({ blog: blogId, isApproved:true }).sort({ createdAt: -1 });
        res.json({ success:true, comments });
    }
    catch (error) {
    res.json({ success: false, message: error.message });
  }
}


export const generateContent=async(req,res)=>{
    try{
        const {prompt}=req.body;
        const content=await main(prompt+'Generate a blog content for this topic in short')
        res.json({success:true, content})
    }   catch(error){
        res.json({success: false, message: error.message})
    }
}