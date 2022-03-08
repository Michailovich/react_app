import React, { useEffect, useState } from "react";
import PostService from "../API/PostService";
import PostFilter from "../component/PostFilter";
import PostForm from "../component/PostForm";
import PostList from "../component/PostList";
import MyButton from "../component/UI/button/MyButton";
import Loader from "../component/UI/loader/Loader";
import MyModal from "../component/UI/modals/MyModals";
import Pagination from "../component/UI/pagination/Pagination";
import { useFetching } from "../hooks/useFetching";
import { usePosts } from "../hooks/usePost";
import { getPageCount } from "../utils/pages";


function Posts() {
  
  const [posts,setPosts] = useState([]);
  const [filter,setFilter] = useState({sort:'',query:''})
  const [modal,setModal] = useState(false);
  const [totalPage,setTotalPage] = useState(0);
  const [limit,setLimit]= useState(10);
  const [page,setPage]= useState(1);
  const [fetchPosts,isPostingLoading,postError]=useFetching(async()=>{
    const response = await PostService.getAll(limit,page);
    setPosts(response.data);
    const totalCount = response.headers['x-total-count']
    setTotalPage(getPageCount(totalCount,limit))
  })

  const sortedAndSearchedPosts = usePosts(posts,filter.sort,filter.query);

  

  useEffect(()=>{
    fetchPosts();
  },[page])

  const createPost = (newPost)=>{
    setPosts([...posts,newPost]);
    setModal(false);
  }

  const changePage = (page)=>{
    setPage(page);
  }
  const removePost = (post)=>{
    setPosts(posts.filter(p => p.id !== post.id))
  }

  return (
    <div className="App">
      <MyButton onClick={()=>setModal(true)}>
        Создать пользователя
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin:'15px'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError && 
        <h1>Ошибка ${postError}</h1>
      }
      {isPostingLoading
        ? <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}><Loader/></div>
        :<PostList remove={removePost} posts={sortedAndSearchedPosts}/>
      }
      <Pagination page={page} changePage={changePage} totalPage={totalPage}/>    
    </div>
  );
}

export default Posts;
