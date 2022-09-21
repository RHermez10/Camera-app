import { ReactElement } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const UserPage = (): ReactElement => {
    const navigate = useNavigate();

    const user: string | null = sessionStorage.getItem('loggedIn');

    const logOut = () => {
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <div className="user-page">
            <h2>Welcome {user}</h2>
            <button onClick={logOut}>Log Out</button>
            <Outlet />
        </div>
    )
}

export default UserPage;