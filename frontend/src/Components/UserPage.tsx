import { ReactElement, useState } from 'react';
import { Outlet } from 'react-router-dom';

const UserPage = (): ReactElement => {
    const [username, setUsername] = useState('defaultUser');

    return (
        <div className="user-page">
            <h2>Welcome {username}</h2>
            <Outlet />
        </div>
    )
}

export default UserPage;