import React,{useEffect,useState} from "react"
import DOMPurify, { sanitize } from 'dompurify'
import { parse } from 'node-html-parser'
import {Link} from 'react-router-dom';
import Actions from '../Actions/Actions';

export default function BlogPost({setUsers}){ //custom component

    const [posts, setPosts] = React.useState([]);
    const [mapUser, setUserMap] = React.useState({});

    useEffect(() => {
      async function fetchMultipleData() {
        try {
          const [userResponse, postResponse] = await Promise.all([
            fetch('http://localhost:8000/users/'),
            fetch('http://localhost:8000/Posts/')
          ]);
    
          const userJson = await userResponse.json();
          const postJson = await postResponse.json();


          let mapuser = {};
          userJson.payload.forEach(userObj => {
          mapuser[userObj.id] = userObj.username;

        });

          console.log('Post JSON Data:', postJson); 
          console.log('User JSON Data:', userJson);
          console.log("mapuser",mapuser);

          setUsers(userJson.payload || []); 
          setPosts(postJson.payload || []); 
          setUserMap(mapuser);
    

        } 
        catch (error) {
          console.error(error);
        }
      }

      fetchMultipleData();

}, [setPosts]);

if(posts.length === 0){
  return(
    <div className="middlepanel">
      <div className='blog-loader-container'>
      <div className='blog-loader'></div>
      </div></div>
)}

const sanitizeHtml = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS : ['a','b','p','li','ol','ul','i','strong','u','blockquote','s']
      })
};
    
  return (
    <div className="middlepanel">
    <div className="middlepanel_tags_container">
      <ul className="tags_container">
        <Link style={{textDecoration:"none", color:"grey"}}><li>Sports</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Life</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Technology</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Politics</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Relationships</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Humor</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Productivity</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Self Improvement</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Psychology</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Programming</li></Link>
        <Link style={{textDecoration:"none", color:"grey"}}><li>Jobs</li></Link>
      </ul>
    </div>
      <ul className = "article-li">
        {posts.map(post => {
        const sanitizedContent = sanitizeHtml(post.content);
        const contentWithImageFixed = sanitizedContent.replace(/<p>(.*?)<img(.*?)\/>(.*?)<\/p>/g, '<p>$1</p><img $2 /><p>$3</p>'); //regex exp to replace the img from the text
        const imgElement = parse(post.content).querySelector('img')
        const imgUrl = imgElement ? imgElement.getAttribute('src') : null

        return(
          <li key={post.id}> {/* Ensure key is unique */}
            <div className="article-container">
              <div className="article-meta">
                  <div className="user-details">
                  <img src="frontend/src/logo.svg" className="profile_pic" />
                  <p className="card-username">{mapUser[post.uid]}</p>
                  <p className="time-ago"> &nbsp; &#8226; {post.time_ago}</p>
                  </div>

              <Link to = {`/article/${post.id}/${post.uid}`} className="article-title"><h2>{post.title}</h2></Link>
              <p className="article-subtitle" dangerouslySetInnerHTML={{ __html: contentWithImageFixed.slice(0,150) }}></p> 
              {console.log(post.content)}
              <div className="like-container">
              <Actions postId={post.id} postLikes={post.likes_count} uid = {post.uid} likes={post.likes}/>{
                console.log("user id", post.uid)
              }
              <button className = "reaction-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="19px" fill="#EA33F7"><path d="M880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"/></svg></button>
              <button className = "reaction-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="19px" fill="#EA33F7"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg></button>              
              </div>  
              </div> 
 
              <div className="article-image">
              <img src={imgUrl} alt="Article Image" />
              </div>
                    

          </div>
          {/* <div>right-panel</div> */}
        </li>
  )})}
      </ul>
    </div>
  );
};