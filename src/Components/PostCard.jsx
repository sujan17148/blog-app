import databaseService from "../appwrite/databaseService";
import { Link, } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { FaEye,FaRegUser,FaRegCalendar,FaHeart } from "react-icons/fa";
import Likes from "./Likes";
import { increaseViewsLocally } from "../store/postSlice";
export default function PostCard({
  $id,
  title,
  content,
  author,
  date
}) {
  const {allPostStats}=useSelector(state=>state.post)
  const postData=allPostStats?.find(postStat=>postStat.$id===$id)
  const dispatch = useDispatch();
  async function handleIncreaseViews() {
    try {
      const updatedFileResponse = await databaseService.increaseViews({$id, views:postData.views+1});
      if (updatedFileResponse) {
        dispatch(increaseViewsLocally({$id,views:postData.views+1}));
      }
    } catch (error) {
      console.log(error.message, "view count increase");
    }
  }
  return (
    <Link onClick={handleIncreaseViews} to={`/article/${$id}`}>
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
            <span>Views {postData?.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaHeart />
            <span>Likes {postData?.likes}</span>
          </div>
          </div>
          <div className="h-10 w-10 absolute right-2 top-1/2 -translate-y-1/2"><Likes $id={$id} /></div>
        </div>
      </div>
    </Link>
  );
}

