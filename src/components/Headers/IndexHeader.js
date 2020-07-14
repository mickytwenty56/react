import React, { Component } from "react";

// reactstrap components
import {
  Row,
  Col,
  Carousel,
  CarouselItem,
  CarouselIndicators
} from "reactstrap";

import "./style.css";

// core components

const items = [
  {
    src: require("assets/img/slider_000.png"),
    altText: "Planning a trip?",
    title: "Planning a trip?",
    caption: "Share the ride"
  },
  {
    src: require("assets/img/slider_001.png"),
    altText: "College students",
    title: "College students",
    caption: "Want to earn $15-$20/Hour?"
  },
  {
    src: require("assets/img/slider_002.png"),
    altText: "Driving Home This Weekend?",
    title: "Driving Home This Weekend?",
    caption: "gowyth.com"
  },
  {
    src: require("assets/img/slider_003.png"),
    altText: "College students",
    title: "College students",
    caption: "Want to earn $15-$20/Hour?"
  },
  {
    src: require("assets/img/slider_004.png"),
    altText: "Driving Home This Weekend?",
    title: "Driving Home This Weekend?",
    caption: "gowyth.com"
  }
];

class IndexHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      animating: false
    }
  }

  onExiting = () => {
    this.setState({animating:true});
  };
  
  onExited = () => {
    this.setState({animating:false});
  };

  next = () => {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({activeIndex:nextIndex});
  };
  
  previous = () => {
    if (this.state.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({activeIndex:nextIndex});
  };

  goToIndex = newIndex => {
    if (this.state.animating) return;
    this.setState({activeIndex:newIndex});
  };

  render() {
    return (
      <div id="carousel">
        <div className="container-fluid">
          <Row className="justify-content-center">
            <Col lg="12" md="12" className="carousel-col">
              <Carousel
                activeIndex={this.state.activeIndex}
                next={this.next}
                previous={this.previous}
              >
                <CarouselIndicators
                  items={items}
                  activeIndex={this.state.activeIndex}
                  onClickHandler={this.goToIndex}
                />


                {items.map(item => {
                  return (
                    <CarouselItem
                      onExiting={this.onExiting}
                      onExited={this.onExited}
                      key={item.src}
                    >
                      <img src={item.src} alt={item.altText} />
                    </CarouselItem>
                  );
                })}
                
                <a
                  className="carousel-control-prev"
                  data-slide="prev"
                  href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                    this.previous();
                  }}
                  role="button"
                >
                  <i className="now-ui-icons arrows-1_minimal-left"></i>
                </a>
                <a
                  className="carousel-control-next"
                  data-slide="next"
                  href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                    this.next();
                  }}
                  role="button"
                >
                  <i className="now-ui-icons arrows-1_minimal-right"></i>
                </a>
              </Carousel>
            </Col>
          </Row>
          </div>
      </div>
    );
  }
}

export default IndexHeader;
