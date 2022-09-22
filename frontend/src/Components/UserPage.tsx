import { ReactElement, useEffect } from 'react';
import { Outlet, useNavigate, NavigateFunction } from 'react-router-dom';

const UserPage = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('loggedIn');
    const navigate: NavigateFunction = useNavigate();

    // Is user logged in? Otherwise, redirect to login/signup.
    useEffect(()=>{
        if (!user) {
            navigate('/');
        };
    });

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