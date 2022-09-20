import { ReactElement, useState } from "react";
import { loginObj } from "../../models/RequestObjects";

const Login = (): ReactElement => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async () => {
        const account: loginObj = {
            username: username,
            password: password,
        }

        console.log('login frontend: ', account);
        // fetch post
        try {
            const response = await fetch('http://localhost:1337/login', {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-Type": "application/json" },
            });
            console.log('LOGIN RESPONSE:', response);
        } catch(err) {
            console.error('Error in logging in: ', err);
        };

        // clear state
    }

    return (
        <form className="account-form">
            <label htmlFor="username-input" >Username</label>
            <input id="username-input" type="text" onChange={ (e) => { setUsername(e.target.value) } } />
            <label htmlFor="password-input" >Password</label>
            <input id="password-input" type="password" onChange={ (e) => { setPassword(e.target.value) } }/>
            <input type="button" value='Sign up' onClick={handleSubmit} />
        </form>
    )
};

export default Login;