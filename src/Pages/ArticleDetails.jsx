import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FaRegUser,FaRegCalendar,FaEye,FaHeart } from "react-icons/fa";
import { GoTag } from "react-icons/go";
import databaseService from "../appwrite/databaseService"
import { useEffect } from "react";
import parse from 'html-react-parser';

export default function ArticleDetails(){
  let {id}=useParams()
  const allPosts=useSelector(state=>state.post.allPosts)
  const postData=allPosts.find(post=>post.$id===id)
  useEffect(()=>{
window.scrollTo(0,0)
  },[])
  return <>
   {postData &&  <div className="min-h-screen bg-white dark:bg-slate-900">
    <div className="border-b header border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex items-center justify-between mb-4">
          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm capitalize">
            {postData.status}
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-light-text mb-6 leading-tight">
          {postData.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 text-slate-500">
          <div className="flex items-center gap-2">
            <FaRegUser className="w-5 h-5" />
            <span className="font-medium text-slate-700">{postData.author}</span>
          </div>
    
          <div className="flex items-center gap-2">
            <FaRegCalendar className="w-5 h-5" />
            <span>{postData.date.split("T")[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaEye className="w-5 h-5" />
            <span>Views {postData.views}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeart className="w-5 h-5" />
            <span>Likes {postData.likes}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8  overflow-hidden">
        <img 
          src={databaseService.getFileView(postData.image)} 
          alt={postData.title}
          className="h-64 sm:h-80  rounded-xl lg:h-96"
        />
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
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

      <article className="bg-white rounded-xl border border-slate-200 dark:border-0 dark:text-light-text dark:bg-dark-primary  p-6 sm:p-8">
         {parse(postData.content)}
      </article>

      <div className="mt-8 p-4 sm:p-6 bg-slate-50 dark:bg-dark-primary rounded-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-base text-slate-500">
          <span>By {postData.author}</span>
          <span className="flex items-center  gap-2"><FaRegCalendar/> {postData.date.split("T")[0]}</span>
        </div>
      </div>
    </div>
  </div>}
  </>
}