import { useSelector } from "react-redux";
import PostCard from "../Components/PostCard"
import { Link } from "react-router-dom";

export default function Home() {
  const allPosts=useSelector(state=>state.post.allPosts)
  const publishedPosts=allPosts.filter(post=>post.status.toLowerCase()=="published")
  return (
    <div className="min-h-[calc(100dvh-140px)] p-5 md:px-10  dark:bg-slate-900">
      <Herosection/>
      <FeaturedPostSection publishedPosts={publishedPosts}/>
      <MostViewedPostSection publishedPosts={publishedPosts}/>
    </div>
  );
}

function Herosection(){
  return <div className="md:min-h-[85dvh] min-h-[65dvh]  flex flex-col items-center justify-center">
          <h1 className="text-center dark:text-white font-bold text-3xl md:text-5xl mb-5">Discover <span className="text-accent">Inspiring</span> Stories</h1>
          <p className="text-slate-700 text-center font-semibold text-lg md:text-2xl">Dive deep into carefully crafted articles that spark curiosity, challenge perspectives, and ignite meaningful conversations.</p>
          <Link to="/article" className="py-2 px-4 whitespace-nowrap bg-accent text-white text-center text-lg font-semibold rounded my-5 hover:scale-105 active:scale-95 duration-300 ease-linear">Start Reading</Link>
  </div>
}

function FeaturedPostSection({publishedPosts}){
  const featuredPosts=publishedPosts?.filter(post=>post.isFeatured==true)
  return <div className="w-full min-h-[50dvh]  py-20">
    <h1 className="text-2xl md:text-4xl dark:text-white font-semibold  text-center">Featured Posts</h1>
    <div className="featured-posts flex justify-center gap-10 flex-wrap my-15">
      {featuredPosts?.map(post=> <PostCard key={post.$id} {...post} />)}
    </div>
  </div>
}

function MostViewedPostSection({publishedPosts}){ //.sort mutatus original array so we used tosorted
  const mostViewedPosts=publishedPosts?.toSorted((a,b)=>b.views-a.views)
  return <div className="w-full  min-h-[50dvh]  py-20">
    <h1 className="text-2xl md:text-4xl dark:text-white font-semibold  text-center">Most Viewed Posts</h1>
    <div className="featured-posts flex justify-center gap-10 flex-wrap my-15">
      {mostViewedPosts?.slice(0,3).map(post=> <PostCard key={post.$id} {...post} />)}
    </div>
  </div>
}
