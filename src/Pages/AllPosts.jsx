import { useSelector } from "react-redux"
import PostCard from "../Components/PostCard"
import Pagination from "../Components/Pagination"
import { useState } from "react"
import EmptyState from "../Components/EmptyState"
export default function AllPosts(){
   const allPosts=useSelector(state=>state.post.allPosts)
   const publishedPosts=allPosts.filter(post=>post.status.toLowerCase()=="published")

   const[currentPage,setCurrentPage]=useState(1)
   const perPageData=10
   const lastPage=Math.ceil(publishedPosts?.length/perPageData)
    return <div className="p-5 md:px-10  dark:bg-slate-900 dark:text-white">
        <div className="min-h-[80dvh]">
            <h1 className="font-semibold  text-xl mb-4 md:text-2xl">All posts</h1>
            {publishedPosts && publishedPosts.length>0 ? <div className="grid gap-4  justify-center grid-cols-[repeat(auto-fit,minmax(280px,340px))]">
            {publishedPosts?.slice((currentPage-1)*perPageData,currentPage*perPageData).map(post=>
                <PostCard key={post.$id} {...post}/>)}
            </div> :<div className="flex items-center justify-center h-[67dvh]"><EmptyState message="No posts found."/></div>}
        </div> 

        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage}/>
        
    </div>
}