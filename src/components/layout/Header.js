import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <Fragment>
            <header>
                <Link to={'/'}>
                    <img
                        src={require("../../Logo/topGizzit.logo.svg")}
                        alt="TOP GIZZIT Logo"/>
                </Link>
            </header>
        </Fragment>


    )
};


export default Header;
