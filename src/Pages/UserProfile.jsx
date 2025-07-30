import { useSelector } from "react-redux";
import PostCard from "../Components/PostCard";
import LikedPostCard from "../Components/LikedPostCard";
export default function UserProfile() {
  const currentUser = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.post.allPosts);
  const userPosts = allPosts.filter((post) => post.userId == currentUser.$id);
  return (
    <div className="p-5 md:px-10 lg:flex flex-row-reverse gap-5 space-y-5 dark:bg-slate-900">
      <div className="lg:w-1/2 xl:w-[40%]">
        <UserProfileCard currentUser={currentUser} userPosts={userPosts} />
        <LikedPosts allPosts={allPosts} />
      </div>
      <Posts userPosts={userPosts} />
    </div>
  );
}

import { RxAvatar } from "react-icons/rx";
import EmptyState from "../Components/EmptyState";
function UserProfileCard({ currentUser, userPosts }) {
  const totalViews = userPosts
    .map((post) => post.views)
    .reduce((acc, currentElement) => acc + currentElement, 0);
  const totalLikesOnPost = userPosts
    .map((post) => post.likes)
    .reduce((acc, currentElement) => acc + currentElement, 0);
  const totalLikedPost = useSelector(
    (state) => state.userData.likedPosts?.length
  );
  const totalPublishedPost = userPosts?.filter(
    (post) => post.status.toLowerCase() == "published"
  )?.length;
  return (
    <div className="w-full p-5  max-w-[400px] h-fit font-medium text-lg bg-white dark:bg-dark-primary shadow-[6px_6px_12px_#c5c5c5] dark:text-light-text dark:shadow-[6px_6px_12px_#000] rounded-xl ">
      <RxAvatar className="h-20 w-20  text-accent rounded-full" />
      <div className="px-3">
        <p className="name capitalize">{currentUser.name}</p>
        <p className="email ">{currentUser.email}</p>
        <p className="total-posts">Total Posts:{userPosts?.length || 0}</p>
        <p className="total-published-posts">
          Published Posts:{totalPublishedPost || 0}
        </p>
        <p className="total-draft-posts">
          Drafted Posts:{userPosts?.length - totalPublishedPost || 0}
        </p>
        <p className="total-views">Total Views on Posts: {totalViews || 0}</p>
        <p className="total-views">
          Total Likes on Posts: {totalLikesOnPost || 0}
        </p>
        <p className="total-views">Total Liked Posts: {totalLikedPost || 0}</p>
      </div>
    </div>
  );
}

function Posts({ userPosts }) {
  const publishedPosts = userPosts?.filter(
    (post) => post.status.toLowerCase() == "published"
  );
  const draftedPosts = userPosts?.filter(
    (post) => post.status.toLowerCase() == "draft"
  );
  return (
    <div className="min-h-[80dvh] h-fit bg-white dark:bg-dark-primary md:shadow-[6px_6px_12px_#c5c5c5] dark:md:shadow-[6px_6px_12px_#000] rounded-xl w-full relative">
      {userPosts && userPosts.length <= 0 ? (
        <div className="h-[80dvh] w-full justify-center items-center flex"><EmptyState message="Looks like you haven't Posted yet" /></div>
      ) : (
        <div className="space-y-15 p-3">
          {publishedPosts && publishedPosts.length > 0 && (
            <div>
              {" "}
              <h1 className="text-2xl dark:text-white font-medium mb-5">
                Published Posts
              </h1>
              <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(280px,340px))]">
                {publishedPosts.map((post) => (
                  <PostCard key={post?.$id} {...post} />
                ))}
              </div>
            </div>
          )}
          {draftedPosts && draftedPosts.length > 0 && (
            <div>
              {" "}
              <h1 className="text-2xl dark:text-white font-medium mb-5">
                Drafted Posts
              </h1>
              <div className="grid gap-4 justify-center grid-cols-[repeat(auto-fit,minmax(280px,340px))]">
                {draftedPosts.map((post) => (
                  <PostCard key={post?.$id} {...post} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LikedPosts({ allPosts }) {
  const likedPosts = useSelector((state) => state.userData.likedPosts);
  const likedPostsData = allPosts.filter((post) =>
    likedPosts.includes(post.$id)
  );

  return likedPostsData && likedPostsData.length>0 && <div className="w-full my-5 dark:text-light-text p-3 bg-white dark:bg-dark-primary md:shadow-[6px_6px_12px_#c5c5c5] dark:md:shadow-[6px_6px_12px_#000] rounded-xl">
      <h1 className="text-2xl dark:text-white font-medium mb-5">Liked Posts</h1>
      <div className="w-full space-y-2">
        {likedPostsData?.map(post=><LikedPostCard key={post.$id} {...post}/>)}

      </div>
    </div>
}
