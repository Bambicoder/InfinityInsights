import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BlogPost from '../MiddlePanel/BlogPost';
import DOMPurify, { sanitize } from 'dompurify'
import { parse } from 'node-html-parser'
import userImg from '/home/anushka/Blog/frontend/src/profile_pic.png'

export default function Article(){

    const {postId , userId} = useParams();
    console.log("postId",postId);

    const [article,setArticle] =  useState(null);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getPost(){
            try{
            const postResponse = await fetch(`http://localhost:8000/posts/${postId}/${userId}/`)
            const json = await postResponse.json();

            if(!postResponse.ok){
                throw new Error ("An error has occured");
            }
            console.log("json",json);
            console.log(json.post)

            setArticle(json.post);
            setUser(json.user);

        }
            catch(e){
                setError("Article not found");
                console.error("an error has occured",error);
            }}

    getPost()

},[postId,userId]);

const sanitizeHtml = (content) => {
    return DOMPurify.sanitize(content, {
        ALLOWED_TAGS : ['a','b','p','li','ol','ul','i','strong','u','blockquote','s']
    });

};

if(error){ return <div className='error'>{error}</div> }


if(!article){
    return(
        <div className='loader-container'>
        <div className='loader'></div>
        </div>
    )}


{
const sanitizedContent = sanitizeHtml(article.content);
const textWithoutImg = sanitizedContent.replace(/<p>(.*?)<img(.*?)\/>(.*?)<\/p>/g, '<p>$1</p><img $2 /><p>$3</p>'); 
const imgElement = parse(article.content).querySelector('img')
const imgUrl = imgElement ? imgElement.getAttribute('src') : null


return (
    <div className='container'>
        <div className='top-container'>
        <div className='flex-row-user'>
        <img src={userImg} className="user-meta-data" />
        <div className='user-post-details'>
        <p className="post-username" style={{textTransform: "capitalize" , display:"flex" ,alignItems:"flex-start"}}>{user.username}</p>
        <p className="post-time">{article.time_ago}</p>
        </div></div>
        <div className='let-try'>
        <button className = "save-post-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="19px" fill="#EA33F7"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg></button></div>
        </div>
        <div className='post-container'>
        <div className='post-title-section'>
            <h1 className='post-title-h1'>{article.title}</h1> 
            <div className='tag-container'>
                {(true || article.tag2 || article.tag3) ?
                (<p>in <span style={{color:"#EA33F7", fontSize:"1em"}}>#Life #Health #Grind</span></p>) : null }
            </div></div>

            {imgUrl? 
            (<div className='img-section'>
            <img src={imgUrl} className = "post-img" alt="img" />
            </div>) : null}

        <div className='post-content-section'>
            <p dangerouslySetInnerHTML={{ __html: textWithoutImg }}></p></div></div>

            <div className="like-container">
              <button className = "reaction-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="19px" fill="#EA33F7"><path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"/></svg></button>
              <span className="like-count">{article.likes}</span>
              <button className = "reaction-button"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="19px" fill="#EA33F7"><path d="M880-80 720-240H160q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v720ZM160-320h594l46 45v-525H160v480Zm0 0v-480 480Z"/></svg></button>
                          
            </div>  
            <div className='divider'></div>
            <BlogPost />
    </div>
)}};

