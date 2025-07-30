import parse from "html-react-parser";
import Likes from "../Components/Likes";
import databaseService from "../appwrite/databaseService";
import { Link } from "react-router-dom";

export default function LikedPostCard({ $id, title, content, image }) {
  return (
    <Link to={`/article/${$id}`}>
    <div className="w-full p-3 bg-white dark:bg-dark-primary border border-slate-200 dark:border-slate-700 rounded-md shadow-sm flex gap-3 hover:shadow-md transition-shadow">
      
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0">
        <img
          src={databaseService.getFileView(image)}
          alt={title}
          className="w-full h-full object-cover rounded"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-base font-semibold line-clamp-1 text-slate-800 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
          {parse(content)}
        </p>
      </div>

      {/* Like Button */}
      <div className="flex items-center px-2">
        <Likes $id={$id} />
      </div>
    </div>
    </Link>
  );
}
