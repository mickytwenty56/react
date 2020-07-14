import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import hero1 from "../../assets/img/heros_001.jpg";
import hero2 from "../../assets/img/heros_002.jpg";
import hero3 from "../../assets/img/heros_003.jpg";
import hero4 from "../../assets/img/heros_004.jpg";
import hero5 from "../../assets/img/heros_005.jpg";


class Heros extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 0,
            arrows: false,
            responsive: [
                {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                    }
                },
                {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                    }
                },
                {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                    }
                }
            ]
        };

        return (
            <>
                <div className="section section-heros">
                    <Container>
                        <Row>
                            <Col>
                                <h3 className="title">Our Heroes</h3>
                                <Slider {...settings}>
                                    <div className="hero-img">
                                        <img src={hero1} alt="hero1"></img>
                                    </div>
                                    <div className="hero-img">
                                        <img src={hero2} alt="hero2"></img>
                                    </div>
                                    <div className="hero-img">
                                        <img src={hero3} alt="hero3"></img>
                                    </div>
                                    <div className="hero-img">
                                        <img src={hero4} alt="hero4"></img>
                                    </div>
                                    <div className="hero-img">
                                        <img src={hero5} alt="hero5"></img>
                                    </div>
                                </Slider>
                            </Col>
                        </Row>
                        <Row className={"hero-description"}>
                            <Col>
                                <p>During these tough times, we honor the heroes that at the front lines of the COVID-19 pandemic</p>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default Heros;