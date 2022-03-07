import React, { useEffect, useState } from "react";
import PostForm from "./component/PostForm";
import PostList from "./component/PostList";
import PostFilter from "./component/PostFilter";
import MyModal from "./component/UI/modals/MyModals";
import MyButton from './component/UI/button/MyButton';
import './style/App.css';
import { usePosts } from "./hooks/usePost";
import PostService from "./API/PostService";
import Loader from "./component/UI/loader/loader";
import { useFetching } from "./hooks/useFetching";

function App() {
  
  const [posts,setPosts] = useState([]);
  const [filter,setFilter] = useState({sort:'',query:''})
  const [modal,setModal] = useState(false);
  const [totalCount,setTotalCount] = useState(0);
  const [limit,setLimit]= useState(10);
  const [page,setPage]= useState(1);
  const [fetchPosts,isPostingLoading,postError]=useFetching(async()=>{
    const response = await PostService.getAll(limit,page);
    setPosts(response.data);
    setTotalCount(response.headers['x-total-count'])
  })

  const sortedAndSearchedPosts = usePosts(posts,filter.sort,filter.query);

  useEffect(()=>{
    fetchPosts();
  },[])

  const createPost = (newPost)=>{
    setPosts([...posts,newPost]);
    setModal(false);
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
    </div>
  );
}

export default App;
