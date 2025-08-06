import { useDispatch, useSelector } from "react-redux";
import databaseService from "../appwrite/databaseService";
import { FaRegHeart,FaHeart} from "react-icons/fa";
import {addToLikedPost,removeFromLikedPost} from "../store/userDataSlice"
import userDataService from "../appwrite/userDataService"
import { updatePost } from "../store/postSlice";
import { toast } from "react-toastify";
export default function Likes({ $id, label = "" }) {
  const allPosts = useSelector((state) => state.post.allPosts);
  const postData = allPosts?.find((post) => post.$id === $id);
  const {currentUser,status}=useSelector(state=>state.auth)
  const likedPosts=useSelector(state=>state.userData.likedPosts)
  const isLiked=likedPosts.includes(postData.$id);
  const dispatch = useDispatch();
  async function increaseLikes(e) {
    e.preventDefault()
    e.stopPropagation()
      if(!status){
       toast.error("Please log in to like posts ❤️")
        return;
      }
    try {
      const payLoad = {
        ...postData,
        likes: postData.likes + 1,
      };
      const updatedFileResponse = await databaseService.editPost($id, payLoad);
      if (updatedFileResponse) {
        await userDataService.updateUser({userId:currentUser.$id,likedPost:[...likedPosts,$id]})
        dispatch(addToLikedPost(updatedFileResponse.$id))
        dispatch(updatePost(updatedFileResponse));
      }
    } catch (error) {
      console.log(error.message, "likes increase error");
    }
  }

  async function decreaseLikes(e){
    e.preventDefault()
    e.stopPropagation()
    try {
      const payLoad = {
        ...postData,
        likes: postData.likes - 1,
      };
      const updatedFileResponse = await databaseService.editPost($id, payLoad);
      if (updatedFileResponse) {
        const updatedLikedPosts = likedPosts.filter(id => id !== $id);
        await  userDataService.updateUser({userId:currentUser.$id,likedPost:updatedLikedPosts})
        dispatch(removeFromLikedPost(updatedFileResponse.$id))
        dispatch(updatePost(updatedFileResponse));
      }
    } catch (error) {
      console.log(error.message, "likes decrease error");
    }
  }

  return (
    <button onClick={(e)=>(isLiked? decreaseLikes(e):increaseLikes(e))} className="p-2 px-3 text-lg text-red-500 text-center hover:bg-accent hover:text-white flex gap-2 items-center rounded">
      {label}
      {isLiked ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}
