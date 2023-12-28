import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function ShortPost(props) {
    // console.log(props.like);
    let date = useMemo(() => new Date(props.date), [props.date])
  return (
    <Link to={`/Post/${props.id}`}>
        <h5 className="list-group-item row">
          <span className="d-inline-block col-sm-4 text-primary">
            {props.title}
          </span>
          <span className="d-inline-block col-sm-4 text-right text-info">
            {date.toLocaleDateString()}
          </span>
          <span className="d-inline-block col-sm-4 text-danger text-right ">
            {props.whichSort === 'numComments' ? `Comments   ` : 'Likes '}{' '}
            {props.whichSort === 'numComments' ? props.comment : props.like}
          </span>
      </h5>
    </Link>
  );
}
