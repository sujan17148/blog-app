import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FaRegUser,FaRegCalendar,FaEye,FaHeart } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import { useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "github-markdown-css";

export default function ArticleDetails(){
  let {id}=useParams()
  const allPosts=useSelector(state=>state.post.allPosts)
  const postData=allPosts.find(post=>post.$id===id)
  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  return <>
   {postData &&  <div className="min-h-screen article-details max-w-7xl mx-auto ">
      <div className="details py-10 p-3">
          <span className="bg-purple-600 inline-block  text-white px-3 py-1 rounded-full text-sm capitalize">
            {postData.status}
          </span> 
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold capitalize text-black dark:text-white">
          {postData.title}
        </h1>   
        <div className="flex flex-col sm:flex-row sm:items-center my-2 gap-2 sm:gap-4">
          <div className="flex items-center gap-1">
            <FaRegUser className="w-5 h-5"/>
            <span >{postData.author}</span>
          </div>
    
          <div className="flex items-center gap-1">
            <FaRegCalendar className="w-5 h-5" />
            <span>{postData.date.split("T")[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEye className="w-5 h-5" />
            <span>Views {postData.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaHeart className="w-5 h-5" />
            <span>Likes {postData.likes}</span>
          </div>
        </div>
        <div className="tags flex gap-2 my-4">
        <div className="flex items-center gap-2">
          <GoTag className="w-5 h-5 text-slate-500" />
          <span className="font-medium text-slate-700">Tags</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {postData?.tags.split(",").map((tag, index) => (
            <span 
              key={index}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
      </div>
      <div className="markdown-body p-3">
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {postData.content}
      </Markdown>
    </div>
  </div>}
  </>
}