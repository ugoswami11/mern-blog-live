import { useState } from "react";
// import '../Config';
import axios from "axios";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function register(event){
        event.preventDefault();
        const response = await axios.post('/register',{username, password});

        if(response.status === 200){
            alert('Registration successfull');
        }else{
            alert('Registration failed');
        }
        
    }

    return(
        <form className="register" action="" method="post" onSubmit={register}>
            <h1>Register</h1>
            <input type="text" name="" id="username" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
            <input type="password" name="" id="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
            <button type="submit">Register</button>
        </form>
    );
}