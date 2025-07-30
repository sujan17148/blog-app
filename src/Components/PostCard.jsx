import databaseService from "../appwrite/databaseService";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdModeEditOutline } from "react-icons/md";
import Delete from "./DeletePost";
import Likes from "./Likes";
import { updatePost } from "../store/postSlice";
import parse from "html-react-parser";
export default function PostCard({
  $id,
  title,
  content,
  image,
  userId,
  author,
  date,
  status,
  tags,
  isFeatured,
  views,
}) {
  const dispatch = useDispatch();
  async function increaseViews() {
    try {
      const payLoad = {
        title,
        content,
        image,
        author,
        tags,
        isFeatured,
        userId,
        date,
        status,
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
      <div className="postcard relative group bg-white  dark:text-light-text dark:bg-slate-900  min-w-[280px] max-w-86 mx-auto  w-full aspect-[14/16] rounded-xl hover:scale-105 transition duration-300 ease-linear shadow-[6px_6px_12px_#c5c5c5] dark:shadow-[6px_6px_12px_#000]">
        <EditOptions userId={userId} id={$id} imageId={image} />
        <img
          src={databaseService.getFileView(image)}
          alt="title"
          className="h-[62%] w-full rounded-t-xl"
        />
        <div className="details p-3 h-[38%] flex flex-col  justify-between ">
          <h1 className="title font-bold capitalize text-xl line-clamp-1">
            {title}
          </h1>
          <div className="content line-clamp-2 text-base text-gray-600 leading-5">
            {parse(content)}
          </div>
          <div className="bottom-detalils flex items-center justify-between">
            <div>
              <p className="author text-base capitalize -mb-1">Posted by:{author}</p>
              <p className="date">Date: {date.split("T")[0]}</p>
            </div>
          <Likes $id={$id} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function EditOptions({ userId, id, imageId }) {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.userData);
  const isAuthor = currentUser?.$id == userId || null;
  function goToEditPage(e) {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/article/${id}`);
  }
  return (
    isAuthor && (
      <div className="absolute top-2 right-2 w-fit group-hover:flex items-center hidden">
        <MdModeEditOutline
          onClick={(e) => goToEditPage(e)}
          className="h-10 w-10 p-2 rounded-full hover:bg-accent hover:text-white text-sky-800"
        />
        <Delete id={id} imageId={imageId} />
      </div>
    )
  );
}
