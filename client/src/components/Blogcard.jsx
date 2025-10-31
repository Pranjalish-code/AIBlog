import React from 'react'
import { useNavigate } from 'react-router-dom';

function Blogcard({Blog}) {
    const {title,description,category,image,_id} = Blog;
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
            <img src={image} alt={title} className='aspect-video' />
            <span className='ml-4 mt-3 px-5 py-1 inline-block bg-primary text-white rounded-full text-xs'>{category}</span>
            <div className='p-4'>
                <h5 className='mb-4 font-medium  text-gray-900 cursor-pointer'>
                    {title}
                </h5>
                <p className='mb-4 text-xs  text-gray-600 ' dangerouslySetInnerHTML={{"__html":description.slice(0,90)}}></p>
            </div>
        </div>
    )
}

export default Blogcard
