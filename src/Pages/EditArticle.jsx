import { useParams } from "react-router-dom";
import PostForm from "../Components/PostForm";
import { useSelector } from "react-redux";

export default function EditArticle(){
    let {id}=useParams()
    const allPosts=useSelector(state=>state.post.allPosts)
    const postData=allPosts.find(post=>post.$id===id)
    return <PostForm  initialData={postData} label="Edit Post" buttonlabel="Edit Post"/>
}