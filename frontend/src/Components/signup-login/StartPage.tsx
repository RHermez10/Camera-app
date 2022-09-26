import { ReactElement } from "react";
import { Outlet } from 'react-router-dom';

const StartPage = (): ReactElement => {

    return (
        <section className="start-page">
            <h1>Wedding Photographer</h1>
            <Outlet />
        </section>
    )
}

export default StartPage;