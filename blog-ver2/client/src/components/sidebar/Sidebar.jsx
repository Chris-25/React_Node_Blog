import "./sidebar.css"
import axios from "axios"
import React,{useEffect, useState} from "react"
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(()=>{
        const getCats = async()=>
        {
            const res = await axios.get("/categories");
            setCats(res.data);

        };
        getCats();
    },[]);

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className="sidebarImg" src="https://images.pexels.com/photos/6913841/pexels-photo-6913841.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
                <p>
                    My name is Nguyen Viet Duc.
                    Currently I am student in Hanoi 
                    University of Science and Technology 
                    This is blog used for share my 
                    experiences, thoughts,..                 
                </p>
            </div>
            <div className="sidebarItem">
            <span className="sidebarTitle">CATEGORIES</span>
            <ul className="sidebarList">
                {cats.map((c)=>( 
                    
                    <Link to={`/?cat=${c.name}`} className="link">
                    <li className="sidebarListItem" key = {c.name}>{c.name}</li>
                    </Link>
                    ))}

            </ul>
            </div>
            <div className="sidebarItem">
            <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                <i className="sidebarIcon fab fa-facebook-square"></i>
                <i className="sidebarIcon fab fa-twitter-square"></i>
                <i className="sidebarIcon fab fa-pinterest-square"></i>
                <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
                
            </div>
        </div>
    )
}
