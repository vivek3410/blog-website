import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Comment(props) {
    const [userName,setUserName] = useState('');
    const fetchUserName = useCallback(()=>{
        const data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json")
        data.then(res=>res.json()).then(res=>{
            const user = res.authors[props.data.authorId]
            setUserName(user.firstName + ' ' + user.lastName)
        })
    },[props.data.authorId])
    useEffect(()=>{
        fetchUserName()
    },[fetchUserName])
  return (
    <Link to={`/Profile/${props.data.authorId}`}>
      <li className="media p-4">
        <div>
          {/* <img
            src={`https://joeschmoe.io/api/v1/${userName}`}
            className="mr-3 text-center"
            alt="..."
            width="50px"
          /> */}
          <div className="media-body">
            <h5 className="mt-0 mb-1">{userName}.</h5>
            <label className="font-italic font-weight-bold">Comment:</label>
            <span className="ml-3">{props.data.text}</span>
          </div>
        </div>
      </li>
    </Link>
  );
}
