import React from "react";

// reactstrap components
import {Container} from "reactstrap";

// core components


import googlePlay from "../../assets/img/app-store-google-play2.png";
import appStore from "../../assets/img/app-store-apple-store2.png";

function ProfileHeader() {
    let pageHeader = React.createRef();

    React.useEffect(() => {
        if (window.innerWidth > 991) {
            const updateScroll = () => {
                let windowScrollTop = window.pageYOffset / 3;
                pageHeader.current.style.transform =
                    "translate3d(0," + windowScrollTop + "px,0)";
            };
            window.addEventListener("scroll", updateScroll);
            return function cleanup() {
                window.removeEventListener("scroll", updateScroll);
            };
        }
    });

    return (
        <>
            <div className="page-header clear-filter page-header-small"
                filter-color="blue"
            >
                <div className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("assets/img/college.png") + ")"
                    }}
                    ref={pageHeader}
                ></div>
                <div className="download-content">
                    <Container>
                        <h1 className="download-title">Download the goWyth App Today</h1>
                        <div className="text-center">
                            <a href="https://play.google.com/store/apps/details?id=com.wyth.app" target="_blank" rel="noopener noreferrer"><img src={googlePlay} alt="googlePlay" /></a>
                            <a href="https://apps.apple.com/us/app/wyth/id1428331609" target="_blank" rel="noopener noreferrer"><img src={appStore} alt="appStore" /></a>
                        </div>
                    </Container>
                </div>
            </div>
            
        </>
    );
}

export default ProfileHeader;
