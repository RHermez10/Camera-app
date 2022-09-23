import { ReactElement, useState } from "react";
import { signUpObj } from "../../models/DataObjects";
import { Link } from 'react-router-dom';


const SignUp = (): ReactElement => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [admin, setAdmin] = useState<boolean>(false);

    const handleSubmit = async () => {
        const account: signUpObj = {
            username: username,
            password: password,
            admin: admin,
        }

        console.log('signup frontend: ', account);
        // fetch post
        try {
            const response = await fetch('http://localhost:1337/accounts/signup', {
                method: "POST",
                body: JSON.stringify(account),
                headers: { "Content-Type": "application/json" },
            });
            console.log('SIGNUP RESPONSE:', response);
        } catch(err) {
            console.error('Error in signing up: ', err);
        };

        // clear state
    }

    return (
        <form className="account-form">
            <h2>Sign Up</h2>
            <label htmlFor="username-input" >Username</label>
            <input id="username-input" type="text" onChange={ (e) => { setUsername(e.target.value) } } />
            <label htmlFor="password-input" >Password</label>
            <input id="password-input" type="password" onChange={ (e) => { setPassword(e.target.value) } }/>
            <label htmlFor="admin-input" >Admin user</label>
            <input id="admin-input" type="checkbox" onChange={ (e) => { setAdmin(e.target.checked) } } />
            <input className="account-btn" type="button" value='Sign up' onClick={handleSubmit} />
            <p>Already a user?</p>
            <Link to='/'>
                <button>Login</button>
            </Link>
        </form>
    )
};

export default SignUp;