import React from 'react'
import {assets} from '../../assets/assets'
import toast from 'react-hot-toast';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';

function CommentTableItem({comment, fetchComments}) {
    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);

    const approveComment=async()=>{
      try{
        const {data}=await axios.post('/api/admin/approve-comments',{id:_id})
        if(data.success){
          toast.success(data.message)
          fetchComments()
        }
        else{
          toast.error(data.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    }

    const deleteComment=async()=>{
      try{
        const confirm=window.confirm('Are you sure you want to delete this comment?');
        if(!confirm) return;

        const {data}=await axios.post('/api/admin/delete-comments',{id:_id})
        if(data.success){
          toast.success(data.message)
          fetchComments()
        }
        else{
          toast.error(data.message)
        }
      }catch(error){
        toast.error(error.message)
      }
    }


    return (
        <tr className="border-y border-gray-300">
  <td className="px-6 py-4">
    <b>Blog</b>: {blog.title}
    <br />
    <br />
    <b>Name</b>: {comment.name}
    <br />
    <b>Comment</b>: {comment.content}
  </td>

  <td className="text-gray-600">{BlogDate.toLocaleDateString()}</td>

  <td className="px-6 py-4">
    <div className="flex items-center justify-end gap-3">
      {!comment.isApproved ? (
        <img
          onClick={approveComment}
          src={assets.tick_icon}
          className="w-8 hover:scale-110 transition-transform cursor-pointer"
          alt="approve"
        />
      ) : (
        <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">
          Approved
        </p>
      )}

      <img
        src={assets.bin_icon}
        onClick={deleteComment}
        alt="delete"
        className="w-5 hover:scale-110 transition-transform duration-200 cursor-pointer"
      />
    </div>
  </td>
</tr>

    )
}

export default CommentTableItem
