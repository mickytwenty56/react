import React, { Component } from "react";

let pageHeader = React.createRef();

class AboutHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="page-header about-header clear-filter" filter-color="blue">
                    <div className="page-header-image" style={{
                            backgroundImage: "url(" + require("assets/img/about-header.jpg") + ")"
                        }}
                        ref={pageHeader}
                    >

                    </div>
                </div>
            </>
        );
    }
}

export default AboutHeader;