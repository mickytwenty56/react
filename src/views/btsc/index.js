import React, { Component } from "react";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexFooter from "components/Footers/IndexFooter";

import BTSC from "./btsc.js";
import BtscHeader from "components/Headers/BtscHeader.js";

class BTSCIndex extends Component {
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
        document.body.classList.add("index-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("index-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }

    render() {
        return(
            <>
                <IndexNavbar />
                <div className="wrapper">
                    <BtscHeader />
                    <div className="main">
                        <BTSC />
                    </div>
                </div>
                <IndexFooter />
            </>
        );
    }
}

export default BTSCIndex;