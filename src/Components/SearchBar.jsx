import { useState, useEffect, forwardRef } from "react"
import useDebounce from "../hooks/useDebounce"
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
 const SearchBar = forwardRef((props,ref) =>{ 
  let navigate=useNavigate()
  const [searchValue,setSearchValue]=useState("")
  const [suggestions,setSuggestions]=useState([])
  const {debouncedValue}=useDebounce(searchValue)
  function handleClickSearch(){
    if(debouncedValue.trim()!=""){
      navigate(`/search?query=${searchValue}`);
      setSuggestions([])
      setSearchValue("");
    }
  }
  function handleSearch(e) {
      if (e.key == "Enter" && searchValue.length > 0) {
        navigate(`/search?query=${searchValue}`);
        setSuggestions([])
        setSearchValue("");
      }
    }
  return <div className=" relative min-w-52 w-full shadow-xl sm:shadow-none bg-primary  flex items-center justify-between p-2 focus-within:border-accent  focus-within:border-2 rounded">
  <input
  ref={ref}
  onKeyDown={(e)=>handleSearch(e)}
    className="w-full outline-none  "
    type="text"
    placeholder="Search Products..."
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
  />
  <IoSearchSharp onClick={handleClickSearch}  className="text-xl text-gray-400 " />

   <ShowSuggestion debouncedValue={debouncedValue} setSearchValue={setSearchValue} suggestions={suggestions} setSuggestions={setSuggestions}/>
  
</div>
})

export default SearchBar;

function ShowSuggestion({debouncedValue,setSearchValue,suggestions,setSuggestions}){
     const allPosts=useSelector(state=>state.post.allPosts)
     const publishedPosts=allPosts?.filter(post=>post.status.toLowerCase()=="published")
    useEffect(()=>{
      if(!publishedPosts) return;
      if(debouncedValue.trim()!==""){
        const suggestedProducts=publishedPosts.filter(post=>post.author.trim().toLowerCase().includes(debouncedValue) || post.title.trim().toLowerCase().includes(debouncedValue) || post.tags.trim().toLowerCase().includes(debouncedValue))
        setSuggestions(suggestedProducts)
      }
      else{
        setSuggestions([])
      }
    },[debouncedValue])
    return   <div className={`suggestion absolute z-10 top-11 right-1 w-full  bg-light-primary  dark:bg-dark-primary rounded dark:shadow-[6px_6px_12px_#000] shadow-[6px_6px_12px_#c5c5c5]  ${suggestions.length==0 ? "hidden":""}`}>
           {suggestions?.slice(0,5).map(post=>(<Link  onClick={()=>{
            setSuggestions([])
            setSearchValue("")
           }} key={post.$id} to={`/article/${post.$id}`}>  <p 
                className="p-2 py-1 my-1 border-b border-b-light-text  line-clamp-2"
              >
                {post.title}
              </p></Link> ))}
    </div>
}