import React, { useState } from "react"
import { Link, useLocation } from 'react-router-dom';


export default function Header(){ //custom component

  const [sideBarVisible, setSidebarVisible] = useState(false);

  function showSidebar(){
    setSidebarVisible(!sideBarVisible);
  }

  const useArticlePage = () =>{ //custom hook returns bool 
    const location = useLocation();
    return location.pathname.startsWith('/article');
  }

  const isArticlePage = useArticlePage();

    return(
      <div>
        <nav>
        <ul>
          <li><a href="/blogs"><h1>Infinity<span style={{color: 'rgb(184, 0, 184)'}}>Insights</span></h1></a></li>
          {isArticlePage && 
          <div className="article-for-navbar">
          <li style={{display: "flex", alignItems: "center" ,paddingLeft: "2px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(184, 0, 184)"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
            <Link to="/write" style={{paddingLeft: "2px"}}>Write</Link></li>
            <li><a href="/user">Profile</a></li></div>}

              {sideBarVisible ? (
                <li onClick={showSidebar} className="menu-icon">
                <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(184, 0, 184)"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> </a>
            </li> /*menu-icon*/
              ):(
                <li onClick={showSidebar} className="close-icon">
                <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgb(184, 0, 184)"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>   </a>
            </li>
              ) /* close-icon */
              }       
        </ul>
        </nav>
                 {sideBarVisible &&
                <nav>
                  <ul className="sidebar">
                  <li style={{display: "flex", alignItems: "center" ,paddingLeft: "25px"}}>
                  <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  height="24px" viewBox="0 -960 960 960" 
                  width="24px" fill="rgb(184, 0, 184)">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/>
                  </svg>
                  <Link to="/write" style={{paddingLeft: "2px"}}>Write</Link></li>
                  <li><a href="/user">Profile</a></li>
                  <li><a href="/blogs">My Blogs</a></li>
                  <li style={{display: "flex", alignItems: "center", paddingLeft: "25px"}}>
                  <svg 
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px" viewBox="0 -960 960 960" 
                  width="24px" fill="rgb(184, 0, 184)">
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                  </svg>
                  <a style={{paddingLeft: "2px"}} href="#">Logout</a>
                  </li>
                  </ul>
                </nav>}
      
      </div>
       
       
    )
  }