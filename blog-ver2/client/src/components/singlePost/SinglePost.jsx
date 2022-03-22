import { Link, useLocation } from 'react-router-dom'
import './singlePost.css'
import axios from "axios"
import React,{useEffect, useState, useContext} from "react"
import {Context} from "../../context/Context"

export default function SinglePost() {
    const PF = "http://localhost:5000/images/";
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [categories, setCategories] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async()=>{
            const res = await axios.get("/posts/"+path);
            setPost(res.data);
            //console.log(res);
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setCategories(res.data.categories)
        }
        getPost();
    }, [path])

    const handleDelete = async()=>{
        try{
            await axios.delete(`/posts/${post._id}` , {data: {username:user.username}});
            window.location.replace("/");
        }catch(err){

        }
        
    };
    //console.log(post.username===user.username);
    const handleUpdate = async()=>{
        try{
            await axios.put(`/posts/${post._id}` ,  
                {
                 username:user.username,
                 title,
                 desc,
                 categories
                 });
            //window.location.replace("/");
            setUpdateMode(false);
        }catch(err){

        }
    }
// category
    

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">

                {post.photo &&(
                    <img src={PF + post.photo}
                    alt=""
                    className="singlePostImg" 
                    />
                )}
                    {
                        updateMode ? <input 
                        type="text" 
                        value={title} 
                        onChange={(e)=>setTitle(e.target.value)} 
                        className="singlePostTitleInput" 
                        autoFocus /> : (
                            <h1 className="singlePostTitle">
                      {title}
                      {post.username === user?.username && (
                        <div className="singlePostEdit">
                      <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                      <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
                      </div>
                      )
                      }
                      
                        </h1>
                        )
                    }

                  
                  <div className="singlePostInfo">
                      <span className="singlePostAuthor">Author:
                      <Link className = "link" to={`/?user=${post.username}`}>
                      <b>{post.username}</b>
                      </Link> 
                      
                      </span>
                      <span className="singlePostDate"> {new Date(post.createdAt).toDateString()} </span>
                      
                  </div>
                  {updateMode ? (<textarea className="singlePostDescInput" value={categories} onChange={(e)=>setCategories(e.target.value)}/>) :(
                    <p className="singlePostDescCate">
                      Category:  {categories}
                      </p>
                  ) }

                  {updateMode ? (<textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/>) :(
                    <p className="singlePostDesc">
                      {desc}
                      </p>
                  ) }

                  {updateMode && (
                  <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                  )}
            </div>
        </div>
    )
}
