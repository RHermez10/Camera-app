import { ReactElement, useState } from "react";
import { signUpObj } from "../../models/RequestObjects";

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
            const response = await fetch('http://localhost:1337/signup', {
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
            <label htmlFor="username-input" >Username</label>
            <input id="username-input" type="text" onChange={ (e) => { setUsername(e.target.value) } } />
            <label htmlFor="password-input" >Password</label>
            <input id="password-input" type="password" onChange={ (e) => { setPassword(e.target.value) } }/>
            <label htmlFor="admin-input" >Admin user</label>
            <input id="admin-input" type="checkbox" onChange={ (e) => { setAdmin(e.target.checked) } } />
            <input type="button" value='Sign up' onClick={handleSubmit} />
        </form>
    )
};

export default SignUp;