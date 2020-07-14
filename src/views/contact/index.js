import React, { Component } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexFooter from "components/Footers/IndexFooter";
import ContactHeader from "components/Headers/ContactHeader";


import Contact from "./contact";

class ContactIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        this.handle_sidebar();
    }

    componentDidUpdate() {
        this.handle_sidebar();
    }

    handle_sidebar = () => {
        document.body.classList.add("landing-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("landing-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }

    render() {
        return(
            <>
                <IndexNavbar />
                <div className="wrapper">
                    <ContactHeader />
                    <div className="main">
                        <Contact />
                    </div>
                </div>
                <IndexFooter />
            </>
        );
    }
}

export default ContactIndex;