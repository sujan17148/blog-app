export function getTopViewedPosts(postData){
   return postData.sort((a,b)=>b.views-a.views).slice(0,5).map(post=>({
    id:post.$id,
    title:post.title,
    views:post.views
   }))
}

export function getPostStatusPie(userPosts){
  if(userPosts.length<3) return []
  return [
    { name: "Published", value: userPosts.filter(post=>post.status.toLowerCase()=="published").length, color: "#4ade80" }, 
    { name: "Draft", value: userPosts.filter(post=>post.status.toLowerCase()=="draft").length, color: "#facc15" }, 
    { name: "Pending", value: userPosts.filter(post=>post.status.toLowerCase()=="pending").length, color: "#f87171" },
    ];
}
