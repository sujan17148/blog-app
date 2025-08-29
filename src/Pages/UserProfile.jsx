import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";
import {
  FaRegCalendar,
  FaEye,
  FaHeart,
  FaRegHeart,
  FaFileAlt,
} from "react-icons/fa";
import PostPieChart from "../Components/PieChart";
import { MdLeaderboard, MdModeEditOutline } from "react-icons/md";
import Delete from "../Components/DeletePost";
import EngagementBarChart from "../Components/BarChart";
import { getPostStatusPie, getTopViewedPosts } from "../utils/analyticsData";
export default function UserProfile() {
  const currentUser = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.allPosts);
  const userPosts = allPosts.filter((post) => post.userId == currentUser.$id);
  return (
    <div className="p-5">
      <UserProfileCard currentUser={currentUser} userPosts={userPosts} />
      <Posts userPosts={userPosts} currentUser={currentUser} />
      <LikedPosts allPosts={allPosts} />
    </div>
  );
}

function UserProfileCard({ currentUser, userPosts }) {
  const UserPostsAnalytics = [
    {
      title: "Total Posts",
      data: userPosts?.filter(
        (post) => post.status.toLowerCase() == "published"
      )?.length,
      icon: FaFileAlt,
      analytics: "12% up this month",
    },
    {
      title: "Total Views",
      data: userPosts
        .map((post) => post.views)
        .reduce((acc, currentElement) => acc + currentElement, 0),
      icon: FaEye,
      analytics: "15% up this month",
    },
    {
      title: "Total Likes",
      data: userPosts
        .map((post) => post.likes)
        .reduce((acc, currentElement) => acc + currentElement, 0),
      icon: FaRegHeart,
      analytics: "20% up this month",
    },
    {
      title: "Total Liked Posts",
      data: useSelector((state) => state.userData.likedPosts?.length),
      icon: FaHeart,
      analytics: "something",
    },
  ];
  return (
    <div className="w-full py-5  h-fit font-medium text-lg  rounded-xl ">
      <h1 className="capitalize text-lg md:text-2xl font-semibold text-accent mb-4">
        Welcome, {currentUser?.name}
      </h1>
      <div className="flex details gap-5 flex-wrap">
        {UserPostsAnalytics.map((postAnalytics, index) => {
          const IconComponent = postAnalytics.icon;
          return (
            <div
              key={index}
              className={` ${
                index % 2 == 0 ? "bg-green-300/10" : ""
              } flex flex-col text-sm justify-between p-3 py-5 border border-slate-200 dark:border-slate-700 rounded aspect-video max-h-[130px] w-full sm:w-[calc(50%-10px)] md:w-[calc(25%-15px)]`}
            >
              <div className="top-section flex justify-between items-center">
                <span className="capitalize text-base text-black dark:text-white">
                  {postAnalytics.title}
                </span>
                <IconComponent
                  className={`${
                    index % 2 == 0 ? "text-green-300" : "text-accent"
                  } h-6 w-6 p-1`}
                />
              </div>
              <p className="text-xl font-semibold text-black dark:text-white">
                {postAnalytics.data}
              </p>
              <p className="text-green-400">{postAnalytics.analytics}</p>
            </div>
          );
        })}
      </div>
      <div className="chart flex justify-between items-center flex-wrap my-5 gap-10">
        <div className="w-full md:w-[calc(50%-20px)] h-70 ">
          <p className="font-semibold text-lg md:text-xl ml-5 mb-2 flex items-center gap-2 ">
            <MdLeaderboard className="text-accent" />
            Most Viewed Posts
          </p>
            <EngagementBarChart data={getTopViewedPosts(userPosts)} />
        </div>
        <div className="piechart w-full md:w-[calc(50%-20px)] h-70 ">
          <p className="font-semibold text-lg md:text-xl ml-5 mb-2 flex items-center gap-2">
            {" "}
            <FaFileAlt className="text-accent" />
            Post Distribution
          </p>
          <PostPieChart data={getPostStatusPie(userPosts)} />
        </div>
      </div>
    </div>
  );
}

function Posts({ userPosts, currentUser }) {
  return (
    <div className="post">
      <h1 className="text-black dark:text-white font-semibold text-lg md:text-2xl">
        Recent Posts
      </h1>
      <div className="user-posts">
        {userPosts &&
          userPosts.map((post) => (
            <div
              key={post.$id}
              className="postcard group relative flex items-center justify-between w-full my-2 p-3 py-5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark-primary text-secondary dark:text-white hover:scale-101 rounded transition duration-300 ease-linear"
            >
              <EditOptions userId={currentUser.$id} id={post.$id} />
              <div className="left">
                <p className="title font-bold capitalize text-xl line-clamp-1 my-2">
                  {post.title}
                </p>
                <div className="details flex gap-x-2.5 mt-1 text-sm flex-wrap text-secondary">
                  <div className="flex items-center gap-1">
                    <FaRegCalendar />
                    <span>{post.date.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaEye />
                    <span>Views {post.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaHeart />
                    <span>Likes {post.likes}</span>
                  </div>
                </div>
              </div>
              <div className="right flex gap-2 items-center ">
                <span className="bg-purple-600 inline-block  text-white px-3 py-1 rounded-full text-sm capitalize">
                  {post.status}
                </span>
                <Link
                  to={`/article/${post.$id}`}
                  className=" inline-block  dark:text-white text-secondary px-3 py-1 rounded-full text-sm capitalize"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function LikedPosts({ allPosts }) {
  const likedPosts = useSelector((state) => state.userData.likedPosts);
  const likedPostsData = allPosts.filter((post) =>
    likedPosts.includes(post.$id)
  );
  return (
    likedPostsData &&
    likedPostsData.length > 0 && (
      <div className="w-full my-5 dark:text-light-text">
        <h1 className="text-lg md:text-2xl dark:text-white text-black font-semibold mb-2">
          Liked Posts
        </h1>
        <div className="w-full flex flex-col gap-2">
          {likedPostsData?.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </div>
    )
  );
}

function EditOptions({ userId, id }) {
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
      <div className="absolute z-20 right-0 top-0 w-fit group-hover:flex items-center hidden">
        <MdModeEditOutline
          onClick={(e) => goToEditPage(e)}
          className="h-8 w-8 p-1 rounded-full hover:bg-accent hover:text-white text-sky-800"
        />
        <Delete id={id} />
      </div>
    )
  );
}
