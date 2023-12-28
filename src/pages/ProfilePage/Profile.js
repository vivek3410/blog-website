import React, { useCallback, useEffect, useState } from 'react';
import './Profile.css'
import AuthorCard from '../../components/AuthorCard/AuthorCard';
import FilterHeader from '../../components/FilterHeader/FilterHeader';
import UserPostList from '../../components/UserPostList/UserPostList';
import { useParams } from 'react-router-dom';
function AuthorPage() {
  const { authorId} = useParams()
  const [posts,setPosts] = useState([]);
  const [activeButton,setActiveButton] = useState('');
  const [author,setAuthor] = useState({});

  const fetchPost = useCallback(async (id) => {
    const data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json");
    data.then(res => res.json()).then(res => {
      const posts = res.posts.filter(post => parseInt(post.authorId) === parseInt(id));
      setPosts(posts)
    })
  },[])
  const fetchUser = useCallback(async (id) => {
    const data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json");
    data.then(res => res.json()).then(res => {
      const user = res.authors[id];
      setAuthor(user)
    })
  },[])
  useEffect(()=> {
    fetchPost(authorId);
  },[fetchPost,authorId])

  useEffect(()=>{
    fetchUser(authorId)
  },[fetchUser,authorId])

  const ascDate = useCallback(() => {
    setActiveButton('ascDate')
    let data = posts
    data.sort((a,b) => {
      return new Date(a.datePublished) - new Date(b.datePublished)
    })
    setPosts([...data])
  } , [posts])

  const dscDate = useCallback(()=>{
    setActiveButton('dscDate')
    let data = posts
    data.sort((a,b) => {
      return new Date(b.datePublished) - new Date(a.datePublished)
    })
    setPosts([...data])
  },[posts])

  const ascLike = useCallback(()=>{
    setActiveButton('ascLike')
    let data = posts
    data.sort((a,b) => {
      return a.numLikes - b.numLikes
    })
    setPosts([...data])
  },[posts])

  const dscLike = useCallback(()=>{
    setActiveButton('dscLike')
    let data = posts
    data.sort((a,b) => {
      return b.numLikes - a.numLikes
    })
    setPosts([...data])
  },[posts])

  return (
    <div>
      {/* Author Details */}
      <AuthorCard author={author} />

      <div className="container">
        <h3 className="pt-4 pl-4 pb-3">Posts</h3>

        {/* Filter Header */}
        <FilterHeader
          activeButton={activeButton}
          ascDate={ascDate}
          dscDate={dscDate}
          ascLike={ascLike}
          dscLike={dscLike}
        />

        <UserPostList posts={posts} />
      </div>
    </div>
  );
}

export default AuthorPage;
