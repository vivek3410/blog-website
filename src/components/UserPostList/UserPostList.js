import React from 'react';
import ShortPost from '../ShortPost/ShortPost';

export default function UserPostList({posts}) {
  return (
    <ul className="list-group">
      {posts.length === 0 ? (
        <h1 className="text-center">loading.... </h1>
      ) : (
        posts.map(post => {
          return (
            <ShortPost
              key={post.id}
              title={post.title}
              like={post.numLikes}
              date={post.datePublished}
              id={post.id}
            />
          )
        })
      )}
    </ul>
  );
}
