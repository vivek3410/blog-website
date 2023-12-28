import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ShortPost from '../../components/ShortPost/ShortPost';

export default function MostLikedPost() {
  const [isLoading,setIsLoading] = useState(true);
  const [posts,setPosts] = useState([]);

  let whichSort = useMemo(
    () =>
      window.location.pathname.split('/')[1] === 'MostLikedPost'
        ? 'numLikes'
        : 'numComments',
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [window.location.pathname],
  )

  const swap = useCallback((items,leftIndex,rightIndex) => {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  },[])

  const partition = useCallback((items,left,right) => {
    var pivot = items[Math.floor((right+left)/2)]
    var i = left;
    var j = right;
    while(i <= j){
      while(items[i][whichSort] < pivot[whichSort]){
        i++;
      }
      while(items[j][whichSort] > pivot[whichSort]){
        j--;
      }
      if(i <= j){
        swap(items,i,j);
        i++;
        j--;
      }
    }
    return i;
  },
  [swap,whichSort],
  )

  const quickSort = useCallback(
    (items, left, right) => {
      var index
      if (items.length > 1) {
        index = partition(items, left, right) //index returned from partition
        if (left < index - 1) {
          //more elements on the left side of the pivot
          quickSort(items, left, index - 1)
        }
        if (index < right) {
          //more elements on the right side of the pivot
          quickSort(items, index, right)
        }
      }
      return items
    },
    [partition],
  )


  const fetchPost = useCallback(()=>{
    let data = fetch("https://raw.githubusercontent.com/MohitSojitra/react-blog-website/master/src/utils/db.json")
    data.then((res)=>res.json()).then((res)=>res.posts)
    .then((res) => {
      // console.log(res);
      let result = quickSort(res,0,res.length-1);
      // console.log(result);
      data = result.reverse().slice(0,10)
      setIsLoading(false)
      setPosts([...res])
    })
  },[quickSort])

  useEffect(()=>{
    fetchPost()
  },[fetchPost,whichSort])
  return (
    <div>
      <div className='container'>
        <ul className='list-group'>
          {isLoading ? (
            <h1 className='text-black text-center'>Loading... Please Wait...</h1>
          ):(
            <>
            {
              
              posts.map((post)=>(
                <ShortPost key={post.id} title={post.title} like={post.numLikes} date={post.datePublished} id={post.id} comment = {post.numComments} whichSort = {whichSort}/>
              ))
            }
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
