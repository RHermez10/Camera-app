import { ReactElement } from "react";
import { Outlet, Link } from 'react-router-dom';

const StartPage = (): ReactElement => {

    return (
        <section className="start-page">
            <h1>Photographer</h1>
            <Outlet />
        </section>
    )
}

export default StartPage;