import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import "./style.css"

import img_steps from "assets/img/step-by-step.png";

class Steps extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="section section-steps">
                    <Container>
                        <h2>How it works</h2>
                        <Row>
                            <Col>
                                <img src={img_steps} alt="step-by-step" />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default Steps;