export function getTopViewedPosts({ userPosts, userPostStats }) {
  return userPostStats
    .sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map(postStat => {
      const matchedPost = userPosts.find(p => p.$id === postStat.$id);

      return {
        id: postStat.$id,
        title: matchedPost ? matchedPost.title : postStat.title, // fallback
        views: postStat.views,
      };
    });
}


export function getPostStatusPie(userPosts){
  if(userPosts.length<3) return []
  return [
    { name: "Published", value: userPosts.filter(post=>post.status.toLowerCase()=="published").length, color: "#4ade80" }, 
    { name: "Draft", value: userPosts.filter(post=>post.status.toLowerCase()=="draft").length, color: "#facc15" }, 
    { name: "Pending", value: userPosts.filter(post=>post.status.toLowerCase()=="pending").length, color: "#f87171" },
    ];
}
