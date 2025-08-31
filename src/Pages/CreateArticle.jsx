import PostForm from "../Components/PostForm";
export default function CreateArticle(){
  return <div className="mt-5">
    <h1 className="text-center text-black dark:text-white text-xl font-semibold md:text-2xl">Create New Post</h1>
    <p className="text-center text-secondary">Share your thoughts and ideas with the world</p>
    <PostForm label="Write your Story"/> 
  </div>

}