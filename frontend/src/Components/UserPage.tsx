import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate, NavigateFunction, Link, useLocation } from 'react-router-dom';
import cameraIcon from './svgs/camera-icon.svg';
import galleryIcon from './svgs/gallery-icon.svg';
import userIcon from './svgs/account-icon.svg';


const UserPage = (): ReactElement => {
    const user: string | null = sessionStorage.getItem('loggedIn');
    const navigate: NavigateFunction = useNavigate();
    let location = useLocation();
    const [isCamera, setIsCamera] = useState<boolean>(location.pathname === '/user/camera');

    // Update nav-icon when location changes
    useEffect(()=>{
        setIsCamera(location.pathname === '/user/camera');
    }, [location]);

    // Is user logged in? Otherwise, redirect to login/signup.
    useEffect(() => {
        if (!user) {
            navigate('/');
        };
    });

    // Handle log out
    const logOut = () => {
        sessionStorage.clear();
        navigate('/');
    }

    return (
        <div className="user-page">
            <nav className="nav-bar">
                <img className="nav-item" onClick={logOut} src={userIcon} alt="manage account" />
                <Link className='nav-item' to={`/user/${ isCamera ? '' : 'camera'}`}>
                    <img className='nav-icon' src={isCamera ? galleryIcon : cameraIcon} />
                </Link>
            </nav>

            <Outlet />
        </div>
    )
}

export default UserPage;