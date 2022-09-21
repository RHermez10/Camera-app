import {ReactElement} from 'react';
import {Outlet} from 'react-router-dom';

type userProps = {
    username: string;
}

const UserPage = (props: userProps): ReactElement => {

    const {username} = props;

    return (
        <div className="user-page">
            <h2>Welcome {username}</h2>
            <Outlet />
        </div>
    )
}

export default UserPage;