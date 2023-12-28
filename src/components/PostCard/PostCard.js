import React, { useCallback, useEffect, useState } from 'react';
import './PostCard.css';
export default function PostCard(props) {
    const [authorName,setAuthorname] = useState('')
    const fetchData = useCallback(() => {
        const data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json");
        data.then(res => res.json()).then(res => {
            const user = res.authors[props.authorId]
            setAuthorname(user.firstName + ' ' + user.lastName)
        })
    },[props.authorId])
    useEffect(()=>{
        fetchData()
    },[fetchData])
  return (
    <div className="card w-100">
      <h1>{props.title}</h1>
      <div className=" p-5 ">
        <div className="mainContent mx-auto">{props.description}</div>
      </div>
      <p className="title text-secondary">
        Date : {new Date(props.date).toLocaleDateString()}
      </p>
      <p>Author : {authorName}</p>
      <p>LIKES : {props.numLikes}</p>
    </div>
  );
}
