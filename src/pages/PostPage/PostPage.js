import React, { useCallback, useEffect, useState } from 'react';
import PostCard from '../../components/PostCard/PostCard';
import './PostPage.css';
import { useParams } from 'react-router-dom';
import Comment from '../../components/comments/Comment';
export default function PostPage() {
  const {postId} = useParams();
  const [post,setPost] = useState({});
  const [isLoading,setIsLoading] = useState(true);
  const [comments,setComments] = useState([])

  const fetchPost = useCallback((id)=>{
    const data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json");
    data.then(res => res.json()).then(res => {
      const post = res.posts[id]
      setPost({...post})
    })
  },[])

  const fetchComments = useCallback(id => {
    const data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json")
    data.then(res=>res.json()).then(res => {
      const comments = res.comments.filter(comment => parseInt(comment.postId) === parseInt(id))
      setComments([...comments])
      setIsLoading(false)
    })
  })

  useEffect(()=>{
    fetchComments(postId)
  },[fetchComments,postId])

  useEffect(()=>{
    fetchPost(postId)
  },[fetchPost,postId])

  return (
    <div>
      {post.title === undefined ? (<h1>Loading...</h1>):
      (
        <PostCard
          title={post.title}
          authorId={post.authorId}
          date={post.datePublished}
          numLikes={post.numLikes}
          description={post.description}
        />
      )}
       <h4 className="mt-4 text-center">Comments</h4>
      <div className="comment-box d-flex justify-content-center">
        <br></br>
        <ul className="list-unstyled m-4 ">
          {isLoading ? (
            <h1>loading</h1>
          ) : comments.length === 0 ? (
            <h1>No comment </h1>
          ) : (
            comments.map(comment => <Comment key={comment.id} data={comment} />)
          )}
        </ul>
      </div>
    </div>
  );
}
