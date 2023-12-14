import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../css/TopNavBar.css';
import FCCrest from '../media/FCCrest.png'
import {auth} from "../Firebase.js"
import { onAuthStateChanged, signOut } from "firebase/auth";

const TopNavBar = () => {

    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

    useEffect(() =>{
        const listen = onAuthStateChanged(auth, (user) =>{
            if(user){
                setAuthUser(user);
            } else{
                setAuthUser(null);
            }
            
        });
        return () =>{
            listen();
        }
    }, []);

    const usersignOut = () =>{
        signOut(auth).then(() =>{
            console.log('sign out success');
            
            navigate("/signin", {replace:true});
        }).catch(error => console.log(error));
    }

    return(
        <nav className="navBar">
            <ul className="navList">
                <li className="navItemimg"> 
                    <img src={FCCrest} alt="FC Crest"/>
                </li>
                <li ><Link className="navItem" to="/">Home</Link> </li>
                <li className="logout">
                    <button className="navItem" onClick={usersignOut} >Logout</button>
                </li>
            </ul>
        </nav>
    );

};

export default TopNavBar;