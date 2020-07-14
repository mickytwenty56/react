import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "./style.css";

import googlePlay from "../../assets/img/app-store-google-play2.png";
import appStore from "../../assets/img/app-store-apple-store2.png";

class IndexFooter extends Component {
    render() {
        return (
            <footer className="footer footer-default">
                <Container>
                    <Row>
                        <Col md={4} sm={4}>
                            <div className={"footer-title"}>Company</div>
                            <ul>
                                <li>
                                    <a href="/about">About Us</a>
                                </li>
                                <li>
                                    <a href="/contact">Contact Us</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={4} sm={4}>
                            <div className={"footer-title"}>Help Services</div>
                            <ul>
                                <li>
                                    <a href="/faqs">FAQs</a>
                                </li>
                                <li>
                                    <a href="/tutorial">Tutorials</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={4} sm={4}>
                            <div className={"footer-title"}>Download Today!</div>
                            <a href="https://play.google.com/store/apps/details?id=com.wyth.app" target="_blank" rel="noopener noreferrer"><img src={googlePlay} alt="googlePlay" /></a>
                            <a href="https://apps.apple.com/us/app/wyth/id1428331609" target="_blank" rel="noopener noreferrer"><img src={appStore} alt="appStore" /></a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        )
    };
}

export default IndexFooter;