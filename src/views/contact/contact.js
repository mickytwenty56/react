import React, { Component } from "react";
import axios from "./../../components/btsc_axios.js"

import {
    Button,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup, 
    Container, 
    Row, 
    Col,
    Modal,
    ModalBody
} from "reactstrap";

import "./style.css";

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstFocus: false,
            middleFocus: false,
            lastFocus: false,

            user_name: "",
            user_email: "",
            user_subject: "",
            user_message: "",

            user_email_valid: "",

            modal1: false,
            modal2: false,
        }
    }

    handle_input = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});

        
        if ( name === "user_email" ) {
            var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

            if ( reg.test(value) === true ) {
                this.setState({user_email_valid: ""});
            } else {
                this.setState({user_email_valid: "has-danger"});
            }

            if ( value === "" )
                this.setState({user_email_valid: ""});
        }
    }

    handle_send_message = () => {
        if ( this.state.user_name === "" ) {
            this.setState({firstFocus: true});
            document.getElementsByName("user_name")[0].focus();
            return;
        }

        if ( !(this.state.user_email !== "" && this.state.user_email_valid === "") ) {
            this.setState({middleFocus: true});
            document.getElementsByName("user_email")[0].focus();
            return;
        }

        if ( this.state.user_subject === "" ) {
            this.setState({lastFocus: true});
            document.getElementsByName("user_subject")[0].focus();
            return;
        }

        if ( this.state.user_message === "" ) {
            document.getElementsByName("user_message")[0].focus();
            return;
        }

        axios({
            method: "post",
            url: "/contact_us",
            data: {
                "name": this.state.user_name,
                "email": this.state.user_email,
                "subject": this.state.user_subject,
                "message": this.state.user_message,
            }
        })
        .then(
            (res) => {
                this.setState({modal1: true});

                this.setState({user_name: "", user_email: "", user_subject: "", user_message: ""});
            })
        .catch(
            (error) => {
                console.log(error);
                this.setState({modal2: true});
            }
        );
    }

    render() {
        return (
            <>
                <div className="section section-contact-us text-center">
                    <Container>
                        <h2>Contact us</h2>
                        <Row>
                            <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                                <InputGroup className={
                                        "input-lg" + (this.state.firstFocus ? " input-group-focus" : "")
                                    }
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="now-ui-icons users_circle-08"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="user_name"
                                        placeholder="Name..."
                                        type="text"
                                        value={this.state.user_name}
                                        onFocus={() => this.setState({firstFocus: true}) }
                                        onBlur={() => this.setState({firstFocus: false}) }
                                        onChange={ this.handle_input }
                                    ></Input>
                                </InputGroup>
                                
                                <InputGroup className={
                                        "input-lg " + (this.state.middleFocus ? " input-group-focus " : " ") + (this.state.user_email_valid)
                                    }
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className={(this.state.user_email_valid === "" ? "" : "input-group-danger")}>
                                            <i className="now-ui-icons ui-1_email-85"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="user_email"
                                        placeholder="Email..."
                                        type="text"
                                        value={this.state.user_email}
                                        onFocus={() => this.setState({middleFocus: true}) }
                                        onBlur={() => this.setState({middleFocus: false}) }
                                        onChange={ this.handle_input }
                                    ></Input>
                                </InputGroup>

                                <InputGroup className={
                                        "input-lg" + (this.state.lastFocus ? " input-group-focus" : "")
                                    }
                                >
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="now-ui-icons ui-2_chat-round"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input name="user_subject"
                                        placeholder="Subject..."
                                        type="text"
                                        value={this.state.user_subject}
                                        onFocus={() => this.setState({lastFocus: true}) }
                                        onBlur={() => this.setState({lastFocus: false}) }
                                        onChange={ this.handle_input }
                                    ></Input>
                                </InputGroup>
                                
                                <div className="textarea-container">
                                    <Input cols="80"
                                        name="user_message"
                                        placeholder="Type a message..."
                                        rows="10"
                                        type="textarea"
                                        value={this.state.user_message}
                                        onChange={ this.handle_input }
                                    ></Input>
                                </div>
                                
                                <div className="send-button">
                                    <Button block
                                        className="btn-round"
                                        color="info"
                                        onClick={this.handle_send_message}
                                        size="lg"
                                    >
                                        Send Message
                                    </Button>
                                </div>
                            </Col>
                        </Row>

                        <Modal
                            modalClassName="modal-mini modal-info"
                            toggle={() => this.setState({modal1: false}) }
                            isOpen={this.state.modal1}
                        >
                            <div className="modal-header justify-content-center">
                            <div className="modal-profile">
                                <i className="now-ui-icons ui-1_check"></i>
                            </div>
                            </div>
                            <ModalBody>
                            <p>Thank you for contacting us, someone will reach out to you soon.</p>
                            </ModalBody>
                            <div className="modal-footer">
                            <Button
                                className="btn-neutral"
                                color="link"
                                type="button"
                                onClick={() => this.setState({modal1: false}) }
                            >
                                Close
                            </Button>
                            </div>
                        </Modal>

                        <Modal
                            modalClassName="modal-mini modal-danger"
                            toggle={() => this.setState({modal2: false}) }
                            isOpen={this.state.modal2}
                        >
                            <div className="modal-header justify-content-center">
                            <div className="modal-profile">
                                <i className="now-ui-icons ui-1_simple-remove"></i>
                            </div>
                            </div>
                            <ModalBody>
                            <p>Contact submit failed!</p>
                            </ModalBody>
                            <div className="modal-footer">
                            <Button
                                className="btn-neutral"
                                color="link"
                                type="button"
                                onClick={() => this.setState({modal2: false}) }
                            >
                                Close
                            </Button>
                            </div>
                        </Modal>
                    </Container>
                </div>

                
            </>
        );
    }
}

export default Contact;