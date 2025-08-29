import databaseService from "../appwrite/databaseService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import { FaEye,FaRegUser,FaRegCalendar,FaHeart } from "react-icons/fa";
import Delete from "./DeletePost";
import Likes from "./Likes";
import { updatePost } from "../store/postSlice";
export default function PostCard({
  $id,
  title,
  content,
  userId,
  author,
  date,
  status,
  tags,
  isFeatured,
  likes,
  views,
}) {
  const dispatch = useDispatch();
  async function increaseViews() {
    try {
      const payLoad = {
        title,
        content,
        author,
        tags,
        isFeatured,
        userId,
        date,
        status,
        likes,
        views: views + 1,
      };
      const updatedFileResponse = await databaseService.editPost($id, payLoad);
      if (updatedFileResponse) {
        dispatch(updatePost(updatedFileResponse));
      }
    } catch (error) {
      console.log(error.message, "view count increase");
    }
  }
  return (
    <Link onClick={increaseViews} to={`/article/${$id}`}>
      <div className="postcard relative group bg-white text-secondary dark:bg-dark-primary dark:text-white w-full rounded-xl hover:scale-101 transition duration-300 ease-linear border border-slate-200 dark:border-slate-700">
        <div className="details p-3  flex flex-col  justify-between ">
          <h1 className="title font-bold capitalize text-xl line-clamp-1">
            {title}
          </h1>
          <div className="content line-clamp-2 text-sm text-secondary leading-snug w-[calc(100%-25px)]">
            {content}
          </div>
          <div className="details flex gap-2.5 mt-1 text-sm text-secondary">
          <div className="flex items-center gap-1">
            <FaRegUser  />
            <span>{author}</span>
          </div>
    
          <div className="flex items-center gap-1">
            <FaRegCalendar />
            <span>{date.split("T")[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaEye/>
            <span>Views {views}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaHeart />
            <span>Likes {likes}</span>
          </div>
          </div>
          <div className="h-10 w-10 absolute right-2 top-1/2 -translate-y-1/2"><Likes $id={$id} /></div>
        </div>
      </div>
    </Link>
  );
}

