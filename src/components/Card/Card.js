import React from 'react';
import { Link } from 'react-router-dom';

function Card({name,id}) {
  return (
    <div
      className="border-purple-400 border-2 max-w-xl shadow-xl rounded-xl p-2 specialCard mx-aut"
      style={{
        width: '18rem',
        padding: '20px',
        backgroundColor: 'rgb(246,246,246)',
        margin: '15px',
      }}
    >
      {/* <img
        src={`https://joeschmoe.io/api/v1/${name}`}
        className="card-img-top"
        alt="..."
      /> */}
      <div className="card-body text-center">
        <h5 className="card-title text-gray-500 font-semibold">{name}</h5>

        <Link
          className=" text-purple-500 font-bold font-weight-bold"
          to={`/Profile/${id}`}
          id={id}
        >
          Click to view Profile
        </Link>
      </div>
    </div>
  );
}

export default Card;
