import React, {useState} from "react";
import{auth} from '../../Firebase'
import {useNavigate,Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import '../../css/SignIn.css';

const SignIn = () => {

    const navigate = useNavigate();

    const[email, setEmail] = useState('');
    const[password, setPassword]=useState('');

    const signIn = (e) =>{

        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
            console.log(userCredential);
            navigate("/", {replace:true});
        }).catch((error) =>{
            console.log(error);
        });
    }

    return(
        <div className="main">
            <form className="form1"  onSubmit={signIn}>
                <h1 className="sign">Log In</h1>
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

                <button className="submit" type="submit">Log In</button>
 
            </form>
            <p className="forgot" align="center"><Link to="/signup">Sign Up</Link></p>
            <p className="forgot" align="center"><Link to="/forgot">Forgot Password?</Link></p>
        </div>
        
    );
}

export default SignIn;