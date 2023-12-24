import React, {useState} from "react";
import { addUser } from "../Firestore";
import {auth} from '../../Firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {Link, useNavigate} from 'react-router-dom';
import '../../css/SignIn.css';

const SignUp = () => {

    const navigate = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword]=useState('');
    const[passwordReenter, setPasswordReenter]=useState('');
    const[discord, setDiscord]=useState('');



    const signUp = (e) =>{

        if(password === passwordReenter){

        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            console.log(userCredential);
            addUser(userCredential.user.uid, discord);
            alert("Sign Up Successful");
            navigate("/signin",{replace: true});
        }).catch((error) =>{
            console.log(error);
        });
        }
    }

    return(
        <div className="main">
            <form className='form1' onSubmit={signUp}>
                <h1 className="sign">Sign Up</h1>
                <input 
                    className="un"
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <input 
                    className="pass"
                    type="password" 
                    placeholder="Enter your password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input 
                    className="pass"
                    type="password" 
                    placeholder="Reenter your password" 
                    value={passwordReenter} 
                    onChange={(e) => setPasswordReenter(e.target.value)}
                ></input>
                <input 
                className="un" 
                type="text" 
                placeholder="Enter your discord username" 
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                ></input>


                <button className="submit" type="submit">Sign Up</button>
            </form>
            <p className="forgot" align="center"><Link to="/signin">Sign In</Link></p>
        </div>
        
    );
}

export default SignUp;