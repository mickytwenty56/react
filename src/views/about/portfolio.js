import React, { Component } from "react";
import {
    Button,
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Container,
    Row,
    Col
} from "reactstrap";

class AboutPortfolio extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pills: "2",
        }
    }

    render() {
        return (
            <>
                <div className="section">
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto" md="6">
                                <h2 className="title text-center">Portfolio</h2>
                                <div className="nav-align-center">
                                    <Nav className="nav-pills-info nav-pills-just-icons"
                                        pills
                                        role="tablist"
                                    >
                                        <NavItem>
                                            <NavLink className={this.state.pills === "1" ? "active" : ""}
                                                href="#pablo"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({pills: "1"});
                                                }}
                                            >
                                                <i className="now-ui-icons design_image"></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={this.state.pills === "2" ? "active" : ""}
                                                href="#pablo"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({pills: "2"});
                                                }}
                                            >
                                                <i className="now-ui-icons location_world"></i>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className={this.state.pills === "3" ? "active" : ""}
                                                href="#pablo"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({pills: "3"});
                                                }}
                                            >
                                                <i className="now-ui-icons sport_user-run"></i>
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </div>    
                            </Col>
                            
                            <TabContent className="gallery" activeTab={"pills" + this.state.pills}>
                                <TabPane tabId="pills1">
                                    <Col className="ml-auto mr-auto" md="10">
                                        <Row className="collections">
                                            <Col md="6">
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg1.jpg")}
                                                ></img>
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg3.jpg")}
                                                ></img>
                                            </Col>
                                            <Col md="6">
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg8.jpg")}
                                                ></img>
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg7.jpg")}
                                                ></img>
                                            </Col>
                                        </Row>
                                    </Col>
                                </TabPane>

                                <TabPane tabId="pills2">
                                    <Col className="ml-auto mr-auto" md="10">
                                        <Row className="collections">
                                            <Col md="6">
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg6.jpg")}
                                                ></img>
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg11.jpg")}
                                                ></img>
                                            </Col>
                                            <Col md="6">
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg7.jpg")}
                                                ></img>
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg8.jpg")}
                                                ></img>
                                            </Col>
                                        </Row>
                                    </Col>
                                </TabPane>

                                <TabPane tabId="pills3">
                                    <Col className="ml-auto mr-auto" md="10">
                                        <Row className="collections">
                                            <Col md="6">
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg3.jpg")}
                                                ></img>
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg8.jpg")}
                                                ></img>
                                            </Col>
                                            <Col md="6">
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg7.jpg")}
                                                ></img>
                                                <img alt="..."
                                                    className="img-raised"
                                                    src={require("assets/img/bg6.jpg")}
                                                ></img>
                                            </Col>
                                        </Row>
                                    </Col>
                                </TabPane>
                            </TabContent>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default AboutPortfolio;