import React, { useState } from "react";
import 'quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom';

export default function TextEditor(){

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const onTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleProcedureContentChange = (content) => {
    setContent(content);
  };

  
  const handlePublish = async (e) => {
    e.preventDefault() //prevent the form from reloading

    try{
      const response = await fetch('http://127.0.0.1:8000/Posts/publish/',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          uid:1,
          title:title,
          content:content
        })
      })
        if(response.ok){
          console.log("Post published successfully");
        }
        else console.log("Failed to publish the post");
    }
    catch(error){
      console.error("An error occured whil publishing the post", error);
    }
}
  



var modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] }
      ],
      [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  var formats = [
    "header", "height", "bold", "italic",
    "underline", "strike", "blockquote",
    "list", "color", "bullet", "indent",
    "link", "image", "align", "size",
  ];

  return (
    <div className="text-editor">
      <textarea type="text" placeholder="Title" onChange={onTitleChange} name="title" maxLength="150" className="title-input" rows="14" cols="10" wrap="soft" />
      <div className="editor" >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="You can start here ...."
          onChange={handleProcedureContentChange}
          style={{ height: "100%", rows:"14", cols:"40" ,wrap:"soft"}}
        >
        </ReactQuill>
      </div>

      <div className="publish-container">
      <Link onClick={handlePublish} to = '/'>
      <button className="article-publish">Publish</button>
      </Link>
      </div>
    </div>
  );
}