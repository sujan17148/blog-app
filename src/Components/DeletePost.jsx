import { MdDelete } from "react-icons/md";
import databaseService from "../appwrite/databaseService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removePost } from "../store/postSlice";
export default function Delete({id,imageId}){
  const dispatch=useDispatch()
  const navigate=useNavigate()
         async function handleDeletePost(e){
              e.preventDefault()
              e.stopPropagation()
            try {
              const deleteFileResponse = await  databaseService.deleteFile(imageId)
              if(!deleteFileResponse) throw new Error("Error deleting featured image")
                const deletePostResponse=await databaseService.deletePost(id)
            if(!deletePostResponse) throw new Error("Error deleting Post")
              dispatch(removePost(id))
                toast.success("Post deleted successfully")
            } catch (error) {
              console.log(error)
                toast.error( error.message || "unable to delete Post")
            }
          }
      return  <MdDelete onClick={(e)=>handleDeletePost(e)}  className="h-10 w-10 p-2 hover:bg-accent inline-block rounded-full  text-red-600"/>
}