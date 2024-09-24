import './App.css';
import Header from './components/Header/Header'
import BlogPost from './components/MiddlePanel/BlogPost';
import './components/MiddlePanel/Articles.css'
import RightPanel from './components/RightPanel/RightPanel'
import React,{useState} from "react"
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import TextEditor from './components/TextEditor/TextEditor';
import Article from './components/Articles/Article';


export default function App() {

  const [users, setUsers] = React.useState([]); 

  return (
    <Router>
     <Header />
      <div className='app'>
      <Routes>
        <Route path="/" element = {<><BlogPost setUsers={setUsers}/><RightPanel users={users} /></>} />
        <Route path ="/write" element={<TextEditor />}/>
        <Route path="/article/:postId/:userId" element={<Article />}></Route>
      </Routes>
      </div>
      
    </Router>
  );
}


