import { ReactElement, useState } from "react";
import { LoginObj } from "../../models/DataObjects";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

const Login = (): ReactElement => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isWrong, setIsWrong] = useState<boolean>(false);
    const navigate: NavigateFunction = useNavigate();

    const handleSubmit = async () => {
        const account: LoginObj = {
            username: username,
            password: password,
        }

        console.log('login frontend: ', account);
        // fetch post
        try {
            const response = await fetch('http://localhost:1337/accounts/login', {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-Type": "application/json" },
            });
            
            console.log('LOGIN RESPONSE: ', response);

            const data = await response.json();

            console.log('LOGIN DATA: ', data);


            if (data.success) {
                sessionStorage.setItem('loggedIn', username);
                navigate('/user/');
            } else {
                setIsWrong(true)
            }


        } catch(err) {
            console.error('Error in logging in: ', err);
        };

        // clear state
    }

    return (
        <form className="account-form">
            <h2>Log in</h2>
            <label htmlFor="username-input" style={{color: isWrong ? "red" : "white"}}>Username</label>
            <input id="username-input" type="text" onChange={ (e) => { setUsername(e.target.value) } } onClick={()=>{setIsWrong(false)}} />
            <label htmlFor="password-input" style={{color: isWrong ? "red" : "white"}}>Password</label>
            <input id="password-input" type="password" onChange={ (e) => { setPassword(e.target.value) } } onClick={()=>{setIsWrong(false)}} />
            <input className="account-btn button" type="button" value='Log in' onClick={handleSubmit} />
            <section className="question-container">
                <p>Not registered?</p>
                <Link to='/signup'>
                    <p className="link">Sign up</p>
                </Link>
            </section>
        </form>
    )
};

export default Login;