import React, { Component } from "react";
import { Container, Row, Col, Collapse } from "reactstrap";

const faqs = [
    {
      title: "What is Gowyth?",
      text: "Wyth is a college carpooling app for students traveling long distances – home, school events, and trips during winter/spring breaks. Wyth is designed exclusively for college students and provides a platform for students to share rides, offset travel costs and meet new friends along the way. Tell us where and when you need to go along with your preferences and the app will match you with drivers going the same way you are.",
    },
    {
      title: "How does it work?",
      text: "After downloading the app and signing up, then simply open the app, enter your trip details, look for matches and book your trips.",
    },
    {
      title: "When is Gowyth coming to my school?",
      text: "Contact us!",
    },
    {
      title: "What are Gowyth's terms of service?",
      text: "Terms of service.",
    },
    {
      title: "What is Gowyth's privacy policy?",
      text: "Privacy policy",
    },
    {
      title: "How to access/manage my Gowyth account?",
      text: "You can access/manage your account via My Payments. You can view your Credit Card information that will be used as a default when you book a trip. If you want to change your credit or debit card information, you can do so in the app at any time under “My Payments”.",
    },
    {
      title: "How are payments processed?",
      text: "Our payments are processed by Stripe. Review Stripe’s FAQ if you have questions or concerns about the security of your payment info.",
    },
    {
      title: "What is Gowyth's refund policy?",
      text: "For a full refund of trip fees (excluding transaction fees), cancellations must be made a full 24 hours prior to the scheduled trip start time (or 3pm if not specified) on the scheduled date of the trip. If you cancel less than 24 hours prior to the trip start, you will be assessed a 20% cancellation fee along with associated transaction fees.",
    },
    {
      title: "Why was I charged a cancellation fee?",
      text: "You will be charged a fee to compensate the driver for the unfilled seat that had resulted due to your late cancellation.",
    },
    {
      title: "Who do I contact if my payment is incorrect?",
      text: "If your payment is incorrect, please contact customer service at support@gowyth.com.",
    },
    {
      title: "How do cash bonuses work?",
      text: "You may be eligible for cash bonus promotions when you take your first trip and/or invite friends who have never used Wyth before. When applicable, cash bonuses will be credited to your account via the app. .",
    },
  ];

class Faqs extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="section section-faqs">
                    <Container>
                        <h2>FAQs</h2>
                        <Row>
                            <Col>
                                <div className="faqs-list">
                                    <ul>
                                        {faqs.map((faq, index) => {
                                            return (
                                                <li key={index}>
                                                    <FaqItem title={faq.title} text={faq.text} />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

class FaqItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
        }
    }

    toggle = () => this.setState({collapse: !this.state.collapse});

    render() {
        return (
            <div className="faq-item">
                <div className="faq-title">
                    <a onClick={this.toggle}><span>{this.props.title}</span><i className={"now-ui-icons " + (this.state.collapse === true ? "arrows-1_minimal-up" : "arrows-1_minimal-down")}></i></a>
                </div>
                <Collapse isOpen={this.state.collapse}>
                    <div className="faq-body">
                            <p>
                                {this.props.text}
                            </p>
                    </div>
                </Collapse>
            </div>
        );
    }
}

export default Faqs;