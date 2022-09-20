import { ReactElement, useState } from "react";
import { accountObj } from "../../models/RequestObjects";

interface FormProps {
    buttonText: string
};

const AccountForm = (props: FormProps): ReactElement => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [admin, setAdmin] = useState<boolean>(false);

    const {buttonText} = props;

    const handleSubmit = async () => {
        const account: accountObj = {
            username: username,
            password: password,
            admin: admin,
        }
        // fetch post
        // clear state
    }

    return (
        <form className="account-form">
            <label htmlFor="username-input" >Username</label>
            <input id="username-input" type="text" onChange={ (e) => { setUsername(e.target.value) } } />
            <label htmlFor="password-input" >Password</label>
            <input id="password-input" type="password" onChange={ (e) => { setPassword(e.target.value) } }/>
            <label htmlFor="admin-input" >Admin user</label>
            <input id="admin-input" type="checkbox" onChange={ (e) => { setAdmin(e.target.value == "checked" ? true : false) } } />
            <input type="button" value={buttonText} onClick={handleSubmit} />
        </form>
    )
};

export default AccountForm;