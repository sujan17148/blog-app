import { MdDelete } from "react-icons/md";
import databaseService from "../appwrite/databaseService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removePost } from "../store/postSlice";
export default function Delete({id}){
  const dispatch=useDispatch()

         async function handleDeletePost(e){
              e.preventDefault()
              e.stopPropagation()
            try {
                const deletePostResponse=await databaseService.deletePost(id)
            if(!deletePostResponse) throw new Error("Error deleting Post")
              dispatch(removePost(id))
                toast.success("Post deleted successfully")
            } catch (error) {
              console.log(error)
                toast.error( error.message || "unable to delete Post")
            }
          }
      return  <MdDelete onClick={(e)=>handleDeletePost(e)}  className="h-8 w-8 p-1 hover:bg-accent inline-block rounded-full  text-red-500"/>
}