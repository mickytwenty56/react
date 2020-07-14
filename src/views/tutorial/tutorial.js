import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import YouTube from "react-youtube";

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
    },
};

class Tutorial extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    
    _onReady = (event) => {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        return (

            <>
                <div className="section section-tutorial">
                    <div className="title">
                        <Container>
                            <h2>Tutorials</h2>
                        </Container>
                    </div>
                    <div className="video-2">
                        <Container>
                            <Row>
                                <Col md={4} className="video-text">
                                    <h3>Gowyth app login</h3>
                                    <p></p>              {/** Some text here */}
                                </Col>
                                <Col md={8}>
                                    <YouTube videoId="lop5gEASUhc" opts={opts} onReady={this._onReady}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="video-1">
                        <Container>
                            <Row>
                                <Col md={8}>
                                    <YouTube videoId="wW4Gc126eoo" opts={opts} onReady={this._onReady}/>
                                </Col>
                                <Col md={4} className="video-text">
                                    <h3>Posting a ride</h3>
                                    <p></p>              {/** Some text here */}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="video-2">
                        <Container>
                            <Row>
                                <Col md={4} className="video-text">
                                    <h3>Searching for a ride</h3>
                                    <p></p>              {/** Some text here */}
                                </Col>
                                <Col md={8}>
                                    <YouTube videoId="9a-iIEJqjls" opts={opts} onReady={this._onReady} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="video-1">
                        <Container>
                            <Row>
                                <Col md={8}>
                                    <YouTube videoId="BeiYVBLXErg" opts={opts} onReady={this._onReady} />
                                </Col>
                                <Col md={4} className="video-text">
                                    <h3>Passenger ride details</h3>
                                    <p></p>              {/** Some text here */}
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className="video-2">
                        <Container>
                            <Row>
                                <Col md={4} className="video-text">
                                    <h3>Driver details</h3>
                                    <p></p>              {/** Some text here */}
                                </Col>
                                <Col md={8}>
                                    <YouTube videoId="AvdAJP4I-NE" opts={opts} onReady={this._onReady}/>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </>
        );
    }
}

export default Tutorial;