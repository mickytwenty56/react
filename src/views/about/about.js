import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";



class About extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="section section-about">
                    <Container>
                        <Row>
                            <Col>
                                <h2 className="text-center">About us</h2>
                                <p>Wyth is a technology platform that offers a city-to-city carpooling solution to US college students who travel long distances home, school events, vacations during school breaks. The app connects students looking for a ride to students offering a ride.</p>
                                <p>This service will be available via free mobile app for the iPhone and Android. Students will no longer have to worry about taking long trips alone, paying for gas themselves, or finding other students wanting to travel the same route. Not only can drivers offset fuel charges, but increasing group travel will ultimately limit carbon emissions thus benefiting the environment.</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default About;