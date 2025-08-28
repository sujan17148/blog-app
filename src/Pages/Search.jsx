import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import PostCard from "../Components/PostCard"
import { useState } from "react"
import Pagination from "../Components/Pagination"
import EmptyState from "../Components/EmptyState"
export default function Search(){
    const location=useLocation()
    const q=new URLSearchParams(location.search)
    const query=q.get("query")?.toLowerCase()
    const allPosts=useSelector(state=>state.post.allPosts)
    const publishedPosts=allPosts.filter(post=>post.status.toLowerCase()=="published")
 const filteredPost=publishedPosts.filter(post=>post.author.trim().toLowerCase().includes(query) || post.title.trim().toLowerCase().includes(query) || post.tags.trim().toLowerCase().includes(query))
 const[currentPage,setCurrentPage]=useState(1)
 const perPageData=10
 const lastPage=Math.ceil(filteredPost?.length/perPageData)
    return <div className="p-5 md:px-10">
    { filteredPost && filteredPost.length>0? 
    <>
    <div className="min-h-[80dvh] mb-10">
            <h1 className="font-semibold dark:text-white text-xl mb-4 md:text-2xl">Search Result: {query}</h1>
            <div className="flex flex-col gap-2">
            {filteredPost?.slice((currentPage-1)*perPageData,currentPage*perPageData).map(post=>
                <PostCard key={post.$id} {...post} />)}
            </div>
        </div> 
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage}/>
        </>
        :<div className="w-full flex justify-center items-center min-h-[88dvh]"><EmptyState message="No results for your search"/></div>}
    </div>
}