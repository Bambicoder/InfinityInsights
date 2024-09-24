import React, { useEffect, useState } from 'react'

const Actions = ({postId,postLikes,user_id,likes}) => {

  const [like, setLike] = useState(postLikes);
  const [userLiked, setUsersLiked] = useState(likes.includes(user_id));

  const sendLikes = async (updated_count) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/posts/update/likes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          post_id: postId,
          likes_count: updated_count,
          user_id: user_id
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log('Like updated successfully', data);
      } else {
        console.log('Failed to update like', data);
      }
    } catch (error) {
      console.error('Error while updating likes:', error);
    }
  };
 
function handleLike(){

  if(userLiked){
    setLike(like-1);
    setUsersLiked(false);
    sendLikes(like-1);
  }
  else{
    setLike(like+1);
    setUsersLiked(true);
    sendLikes(like+1);
  }
}


    return (
      <>
      <button className = "reaction-button" onClick={handleLike}>
      {userLiked ? 
      <><svg xmlns="http://www.w3.org/2000/svg"
      height="24px" viewBox="0 -960 960 960" width="20px" fill="#910094">
      <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>
      <span style={{fontSize:"14px", paddingLeft:"3px" ,color:"#910094"}}>{like}</span>
      </> :
      <><svg xmlns="http://www.w3.org/2000/svg" 
      height="24px" viewBox="0 -960 960 960" width="20px" fill="#EA33F7">
        <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg>
      <span style={{fontSize:"14px", paddingLeft:"3px",color:"#EA33F7"}}>{like}</span>
      </>
      }
      </button>
      </>
  )
}

export default Actions