import { useParams } from "react-router-dom";
import PostForm from "../Components/PostForm";
import { useSelector } from "react-redux";

export default function EditArticle(){
    let {id}=useParams()
    const allPosts=useSelector(state=>state.post.allPosts)
    const postData=allPosts.find(post=>post.$id===id)
    return <div className="mt-5">
         <h1 className="text-center text-black dark:text-white text-xl font-semibold md:text-2xl">Edit your Post</h1>
         <p className="text-center text-secondary">Refine your thoughts before sharing</p>
        <PostForm  initialData={postData} label="Update your story"/>
    </div>
}