import { useMemo } from "react";

export const useSortedPosts = (posts,sort)=>{
    const sortedPost = useMemo(()=>{
        if(sort){
          return [...posts].sort((a,b)=>a[sort].localeCompare(b[sort]));
        }
        return posts;
      },[sort,posts]);
    
    return sortedPost;
}

export const usePosts = (posts,sort,query)=>{
    const sortedPost = useSortedPosts(posts,sort);

    const sortedAndSearchedPosts = useMemo(()=>{
        return sortedPost.filter(post => post.title.toLowerCase().includes(query));
      },[query,sortedPost]);
      
    return sortedAndSearchedPosts;
}

export const usePagesArray = (totalPage)=>{
  const results = useMemo(()=>{
    let arrayd=[];
    for (let i = 0; i < totalPage; i++) {
      arrayd.push(i+1);
    }
  },[]);

  return results;
}