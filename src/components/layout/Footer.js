import React, { Fragment }  from 'react';
import Moment from "react-moment";
import { Link } from 'react-router-dom';

const Footer = props => {
    const date = new Date()
    return (
        <Fragment>
            <footer className={"footer"} id="footer">
                <div>
                    <a href="mailto:orders@topgizzit.com?subject=Website Enquiry"><i className="fas fa-envelope" /></a>
                </div>
                <section>
                    <h3>TOP GIZZIT</h3>
                    <p>A Trading Name of 2TM Ltd</p>
                    <p>CORNWALL</p>
                </section>

                <Link to={"/terms-conditions"} className="btn-site">Terms and Conditions</Link>

                <p>&#169; Copyright 2TM Ltd <Moment format={"YYYY"} date={date}/></p>

            </footer>
        </Fragment>

    )
};

export default Footer;
