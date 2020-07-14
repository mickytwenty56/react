import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import axios from "./../../components/btsc_axios.js"

import { 
    Container, 
    Row, 
    Col,
    Card,
    CardHeader,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    TabContent,
    TabPane,
    Modal,
    ModalBody,
    Alert,
    Progress,
    UncontrolledCollapse,
    UncontrolledPopover,
    PopoverBody,
    PopoverHeader
} from "reactstrap";

import Scroll from "react-scroll";

import Datetime from "react-datetime";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";

import DonationProgressBar from "components/ProgressBar/donation_commit.js";
import Co2SavingsProgressBar from "components/ProgressBar/co2_savings";

import str_format from "string-format";

import "./style.css";
import { isMoment } from "moment";

var Element = Scroll.Element;

let driver_src_place_id = "", driver_dst_place_id = "";
let rider_src_place_id = "", rider_dst_place_id = "";
let driver_src_raw = "", driver_dst_raw = "";
let rider_src_raw = "", rider_dst_raw = "";

class BTSC extends Component {
    constructor(props) {
        super(props);

        this.state = {
            iconPills: "1",
            alert: false,
            alert_text: "",
            modal1: false,          // drivers/trips success
            modal2: false,          // drivers/trips failed
            modal3: false,          // riders/trips success
            modal4: false,          // riders/trips failed

            participating_colleges: 0,
            green_award: "",
            donation_award: "",

            total_seats: 0,
            total_seats_offered: 0,
            total_seats_demanded: 0,

            list_of_schools: [],
            list_show: false,

            refresh_total_progress: false,

            driver_first_name: "",
            driver_last_name: "",
            driver_email: "",
            driver_email_valid: "",
            driver_date: "",
            driver_src_description: "",
            driver_dst_description: "",
            driver_donations: 0.1,
            driver_seats: 1,
            driver_earning_low: 0,
            driver_earning_high: 0,
            driver_co2_savings: 0,

            driver_text1: "",
            driver_text2: "",
            driver_text3: "",
            driver_text4: "",

            rider_first_name: "",
            rider_last_name: "",
            rider_email: "",
            rider_email_valid: "",
            rider_date: "",
            rider_src_description: "",
            rider_dst_description: "",
            rider_donations: 5,
            rider_offer_low: 0,
            rider_offer_high: 0,
            rider_co2_savings: 0,

            rider_text1: "",
            rider_text2: "",
            rider_text3: "",
        }
    }

    componentDidMount = () => {
        this.handle_header();

        var params, data;
        
        if ( localStorage.getItem("from_home") === "driver" ) {
            this.setState({iconPills : "1"});

            params = JSON.parse(localStorage.getItem("params"));
            driver_src_place_id = params.src_place_id;
            driver_dst_place_id = params.dst_place_id;
            this.setState({driver_seats: params.seats, driver_donations: params.donation, 
                driver_earning_low: params.earning_low, driver_earning_high: params.earning_high, driver_co2_savings: params.co2_savings});

            data = JSON.parse(localStorage.getItem("data"));
            driver_src_raw = data.src_raw;
            driver_dst_raw = data.dst_raw;
            this.setState({driver_src_description: data.src_raw.description, driver_dst_description: data.dst_raw.description}, () => {document.getElementsByName("driver_first_name")[0].focus();});

            localStorage.clear();
        } else if ( localStorage.getItem("from_home") === "rider" ) {
            this.setState({iconPills : "2"});

            params = JSON.parse(localStorage.getItem("params"));
            rider_src_place_id = params.src_place_id;
            rider_dst_place_id = params.dst_place_id;
            this.setState({rider_donations: params.donation, 
                rider_offer_low: params.offer_low, rider_offer_high: params.offer_high, rider_co2_savings: params.co2_savings});

            data = JSON.parse(localStorage.getItem("data"));
            rider_src_raw = data.src_raw;
            rider_dst_raw = data.dst_raw;
            this.setState({rider_src_description: data.src_raw.description, rider_dst_description: data.dst_raw.description}, () => {document.getElementsByName("rider_first_name")[0].focus();});

            localStorage.clear();
        }
    }
    
    formatNumber(value) {
        const val = (value / 1);
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    show_alert = (text) => {
        this.setState({alert: true, alert_text: text});
        setTimeout(() => this.setState({alert: false}), 5000);
    }

    hide_alert = () => {
        this.setState({alert: false});
    }

    handle_header = () => {
        axios({
            method: "get",
            url: "/totals",
            params: { extended: 1},
        })
        .then(
            (res) => {
                this.setState({participating_colleges: res.data.n_participating_colleges});
                this.setState({green_award: str_format("{}  {} lbs", res.data.schools_by_co2[0].school, this.formatNumber(res.data.schools_by_co2[0].co2_emissions))});
                this.setState({donation_award: str_format("{}  ${}", res.data.schools_by_donation[0].school, this.formatNumber(res.data.schools_by_donation[0].donation))});

                this.setState({total_seats_offered: res.data.total_seats_offered});
                this.setState({total_seats_demanded: res.data.total_seats_demanded});

                var total = (res.data.total_seats_offered > res.data.total_seats_demanded ? res.data.total_seats_offered : res.data.total_seats_demanded);
                this.setState({total_seats: parseInt(total * 1.2 + 1)})

                this.setState({list_of_schools: []});
                for ( var i = 0; i < res.data.n_participating_colleges; i++ ) {
                    this.state.list_of_schools.push({
                        school_co2: str_format("{}  {} lbs", res.data.schools_by_co2[i].school, this.formatNumber(res.data.schools_by_co2[i].co2_emissions)),
                        school_donation: str_format("{}  ${}", res.data.schools_by_donation[i].school, this.formatNumber(res.data.schools_by_donation[i].donation)),
                    })
                }

                this.setState({refresh_total_progress: !this.state.refresh_total_progress});
            })
        .catch(
            (error) => {
                console.log(error);
            });
    }

    /** Driver */
    handle_driver_input = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});

        if ( name === "driver_email" ) {
            var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

            if (reg.test(value) === true && value.includes("edu", value.indexOf("@"))) {
                this.setState({driver_email_valid: "has-success"});
            } else {
                this.setState({driver_email_valid: "has-danger"});
            }

            if ( value === "" )
                this.setState({driver_email_valid: ""});
        }
    }

    handle_driver_date = (moment) => {
        if ( isMoment(moment) ) {
            this.setState({driver_date: moment.format("L")});
        }
    }

    set_driver_src_raw = (arg) => {
        driver_src_place_id = arg.place_id;
        driver_src_raw = arg;

        this.get_drivers_estimates();
    }

    handle_driver_src = (event) => {
        event.target.value = "";
    }

    set_driver_dst_raw = (arg) => {
        driver_dst_place_id = arg.place_id;
        driver_dst_raw = arg;

        this.get_drivers_estimates();
    }
    
    handle_driver_dst = (event) => {
        event.target.value = "";
    }

    handle_driver_donations = (event) => {
        this.setState({driver_donations: event.target.value}, () => {
            this.get_drivers_estimates();
        });
    }

    handle_driver_seats = (event) => {
        this.setState({driver_seats: event.target.value}, () => {
            this.get_drivers_estimates();
        });
    }

    get_drivers_estimates = () => {
        if ( driver_src_place_id === "" || driver_dst_place_id === "" )
            return;
        
        axios({
            method: "post",
            url: "/drivers/estimates",
            params: {
                src_place_id:   driver_src_place_id,
                dst_place_id:   driver_dst_place_id,
                seats:          this.state.driver_seats,
                donation:       this.state.driver_donations
            },
            data: {
                "src_raw_auto_complete": driver_src_raw,
                "dst_raw_auto_complete": driver_dst_raw
            }
        })
        .then(
            (res) => {
                const data = res.data;
                this.setState({driver_co2_savings: data.co2_savings});
                this.setState({driver_earning_low: data.driver_earnings.low});
                this.setState({driver_earning_high: data.driver_earnings.high});
            })
        .catch(
            (error) => {
                console.log(error);
                this.setState({driver_co2_savings: 0});
                this.setState({driver_earning_low: 0});
                this.setState({driver_earning_high: 0});
            }
        );
    };

    handle_driver_submit = (event) => {
        if ( driver_src_place_id === "" || driver_dst_place_id === "" ) {
            this.show_alert("Please confirm trip details.");
            return;
        }

        if ( this.state.driver_first_name === "" || this.state.driver_last_name === "" || this.state.driver_email === "" || this.state.driver_date === "" ) {
            this.show_alert("Please confirm personal information.");
            return;
        }

        if ( this.state.driver_email_valid !== "has-success" ) {
            this.show_alert("Please confirm college email.");
            return;
        }
        
        this.hide_alert();
        axios({
            method: "post",
            url: "/drivers/trips",
            data: {
                "name": str_format("{} {}", this.state.driver_first_name, this.state.driver_last_name),
                "email": this.state.driver_email,
                "src_place_id": driver_src_place_id,
                "dst_place_id": driver_dst_place_id,
                "seats": parseInt(this.state.driver_seats),
                "donation": parseFloat(this.state.driver_donations),
                "src_raw_auto_complete": driver_src_raw,
                "dst_raw_auto_complete": driver_dst_raw

            }
        })
        .then(
            (res) => {
                console.log(res.data);
                this.setState({driver_text1: str_format("{} lbs", this.formatNumber(parseInt(res.data.contribution.co2_saved)))});
                this.setState({driver_text2: str_format("${}", this.formatNumber(parseInt(res.data.contribution.charity)))});
                this.setState({driver_text3: str_format("${} ~ ${}", this.formatNumber(parseInt(res.data.contribution.driver_share.low)), this.formatNumber(parseInt(res.data.contribution.driver_share.high))) });
                this.setState({driver_text4: this.formatNumber(parseInt(res.data.contribution.wyth_share))});
                this.setState({modal1: true});
                this.handle_header();
            })
        .catch(
            (error) => {
                console.log(error);
                this.setState({modal2: true});
            }
        );
    }

    /** Rider */
    handle_rider_input = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({[name]: value});

        
        if ( name === "rider_email" ) {
            var reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

            if (reg.test(value) === true && value.includes("edu", value.indexOf("@"))) {
                this.setState({rider_email_valid: "has-success"});
            } else {
                this.setState({rider_email_valid: "has-danger"});
            }

            if ( value === "" )
                this.setState({rider_email_valid: ""});
        }
    }

    handle_rider_date = (moment) => {
        if ( isMoment(moment) ) {
            this.setState({rider_date: moment.format("L")});
        }
        
    }

    set_rider_src_raw = (arg) => {
        rider_src_place_id = arg.place_id;
        rider_src_raw = arg;

        this.get_rider_estimates();
    }

    handle_rider_src = (event) => {
        event.target.value = "";
    }

    set_rider_dst_raw = (arg) => {
        rider_dst_place_id = arg.place_id;
        rider_dst_raw = arg;
        
        this.get_rider_estimates();
    }
    
    handle_rider_dst = (event) => {
        event.target.value = "";
    }

    handle_rider_donations = (event) => {
        this.setState({rider_donations: event.target.value}, () => {
            this.get_rider_estimates();
        });
    }

    get_rider_estimates = () => {
        if ( rider_src_place_id === "" || rider_dst_place_id === "" )
            return;

        axios({
            method: "post",
            url: "/riders/estimates",
            params: {
                src_place_id:   rider_src_place_id,
                dst_place_id:   rider_dst_place_id,
                donation:       this.state.rider_donations
            },
            data: {
                "src_raw_auto_complete": rider_src_raw,
                "dst_raw_auto_complete": rider_dst_raw
            }
        })
        .then(
            (res) => {
                const data = res.data;
                this.setState({rider_co2_savings: data.co2_savings});
                this.setState({rider_offer_low: data.rider_offer.low});
                this.setState({rider_offer_high: data.rider_offer.high});
            })
        .catch(
            (error) => {
                this.setState({rider_co2_savings: 0});
                this.setState({rider_offer_low: 0});
                this.setState({rider_offer_high: 0});
            }
        );
    };

    handle_rider_submit = (event) => {
        if ( rider_src_place_id === "" || rider_dst_place_id === "" ) {
            this.show_alert("Please confirm trip details.");
            return;
        }

        if ( this.state.rider_first_name === "" || this.state.rider_last_name === "" || this.state.rider_email === "" || this.state.rider_date === "" ) {
            this.show_alert("Please confirm personal information.");
            return;
        }

        if ( this.state.rider_email_valid !== "has-success" ) {
            this.show_alert("Please confirm college email.");
            return;
        }
        
        this.hide_alert();
        axios({
            method: "post",
            url: "/riders/trips",
            data: {
                "name": str_format("{} {}", this.state.rider_first_name, this.state.rider_last_name),
                "email": this.state.rider_email,
                "src_place_id": rider_src_place_id,
                "dst_place_id": rider_dst_place_id,
                "donation": parseFloat(this.state.rider_donations),
                "src_raw_auto_complete": rider_src_raw,
                "dst_raw_auto_complete": rider_dst_raw

            }
        })
        .then(
            (res) => {
                console.log(res.data);
                this.setState({rider_text1: str_format("{} lbs", this.formatNumber(parseInt(res.data.contribution.co2_saved)))});
                this.setState({rider_text2: str_format("${}", this.formatNumber(parseInt(res.data.contribution.charity)))});
                this.setState({rider_text3: str_format("${} ~ ${}", this.formatNumber(parseInt(res.data.contribution.offer.low)), this.formatNumber(parseInt(res.data.contribution.offer.high))) });
                this.setState({modal3: true});
                this.handle_header();
            })
        .catch(
            (error) => {
                console.log(error);
                this.setState({modal4: true});
            }
        );
    }

    render() {
        
        return (
            <div className="section-btsc"
                style={{
                    backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")"
            }}>
                <div className="section btsc-header">
                    <Container className="header">
                        <Row>
                            <Col>
                                <h2>
                                    Back to School Challenge
                                </h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6} className="progress-block">
                                <DonationProgressBar refresh={this.state.refresh_total_progress} />
                            </Col>
                            <Col md={6} className="progress-block">
                                <Co2SavingsProgressBar refresh={this.state.refresh_total_progress} />
                            </Col>
                        </Row>
                        <Row className="header-seats">
                            <Col lg={4} md={5} sm={6} className="progress-title1">
                                <p>Total Seats Offered</p>
                            </Col>
                            <Col lg={8} md={7} sm={6}>
                                <div className="progress-container progress-success progress-offered">
                                    <span className="progress-value">{this.state.total_seats_offered}</span>
                                    <Progress max={this.state.total_seats} value={this.state.total_seats_offered}>
                                    </Progress>
                                </div>
                            </Col>
                        </Row>
                        <Row className="header-seats">
                            <Col lg={4} md={5} sm={6} className="progress-title2">
                                <p>Total Seats Demanded</p>
                            </Col>
                            <Col lg={8} md={7} sm={6}>
                                <div className="progress-container progress-info progress-demanded">
                                    <span className="progress-value">{this.state.total_seats_demanded}</span>
                                    <Progress max={this.state.total_seats} value={this.state.total_seats_demanded}>
                                    </Progress>
                                </div>
                            </Col>
                        </Row>
                        <Row className="header-description">
                            <Col md={4}>
                                <p>Participating Colleges</p>
                                <p><span>{this.state.participating_colleges}</span></p>
                            </Col>
                            <Col md={4}>
                                <p>Green Award</p>
                                <p><span>{this.state.green_award}</span></p>
                            </Col>
                            <Col md={4}>
                                <p>Donations Award</p>
                                <p><span>{this.state.donation_award}</span></p>
                            </Col>
                        </Row>
                        <Row className="header-table">
                            <Col md={12} className="more">
                                <a id="toggler" onClick={() => this.setState({list_show: !this.state.list_show})}><i className={this.state.list_show === true ? "fa fa-angle-double-up" : "fa fa-angle-double-down"}></i></a>
                                
                                <Element className="table-container">
                                    <UncontrolledCollapse toggler="#toggler">
                                        
                                        { this.state.list_of_schools.map((school, index) => (
                                            <Row key={index}>
                                                <Col sm={6}><p><span>{school.school_co2}</span></p></Col>
                                                <Col sm={6}><p><span>{school.school_donation}</span></p></Col>
                                            </Row>
                                        ))}
                                    </UncontrolledCollapse>
                                </Element>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="section btsc-form">
                    <Container>
                        <Row>
                            <Col>
                            <Card className="form-btsc" data-background-color="green">
                            
                                <CardHeader className="text-center">
                                    <Nav className="justify-content-center" role="tablist"  tabs>
                                        <NavItem>
                                            <NavLink
                                                className={this.state.iconPills === "1" ? "active" : ""}
                                                href="#pablo"
                                                onClick={e => {
                                                e.preventDefault();
                                                this.setState({iconPills:"1"});
                                                }}
                                            >
                                                <i className="now-ui-icons users_single-02"></i>
                                                Driver
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={this.state.iconPills === "2" ? "active" : ""}
                                                href="#pablo"
                                                onClick={e => {
                                                e.preventDefault();
                                                this.setState({iconPills:"2"});
                                                }}
                                            >
                                                <i className="now-ui-icons ui-2_favourite-28"></i>
                                                Passenger
                                            </NavLink>
                                        </NavItem>
                                    </Nav>
                                </CardHeader>

                                <CardBody>
                                    <Container className="description">
                                        <Row>
                                            <Col>
                                                
                                                <TabContent
                                                    className="text-center"
                                                    activeTab={"iconPills" + this.state.iconPills}
                                                >
                                                    <TabPane tabId="iconPills1">
                                                        <Form>
                                                            <h5>Trip Details</h5>
                                                            <FormGroup row>
                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>
                                                                            Origin City
                                                                        </Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <GooglePlacesAutocomplete
                                                                                onSelect={this.set_driver_src_raw}
                                                                                placeholder="Chicago"
                                                                                initialValue={this.state.driver_src_description}
                                                                                renderInput={(props) => (
                                                                                    <div className="custom-wrapper" onClick={this.handle_driver_src}>
                                                                                        <Input 
                                                                                            // Custom properties
                                                                                            {...props}
                                                                                            className="input-field"
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>
                                                                            Destination College
                                                                        </Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <GooglePlacesAutocomplete
                                                                                onSelect={this.set_driver_dst_raw}
                                                                                placeholder="Lewis University-Romeoville"
                                                                                initialValue={this.state.driver_dst_description}
                                                                                renderInput={(props) => (
                                                                                    <div className="custom-wrapper" onClick={this.handle_driver_dst}>
                                                                                        <Input 
                                                                                            // Custom properties
                                                                                            {...props}
                                                                                            className="input-field"
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                
                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>
                                                                            Donation 
                                                                            <span id="tooltip116884155"><i className="now-ui-icons travel_info"></i></span>
                                                                        </Label>
                                                                        <UncontrolledPopover
                                                                            trigger="hover"
                                                                            placement="top"
                                                                            target="tooltip116884155"
                                                                        >
                                                                            <PopoverHeader>Driver Donation</PopoverHeader>
                                                                            <PopoverBody>
                                                                            Donations are calculated from gross income. 75% from driver and 25% from Wyth’s income. So a total trip gross revenue of $100, and you “donate” 20% which is $20, you are donating $15 from your share and $5 from Wyth’s share. Rest of revenue of $80 is split at 75% to driver & 25% to Wyth
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                        <Col className="form-col" md={{size:6, offset:2}} sm={{size:6, offset:2}}>
                                                                            <Input
                                                                                type="select"
                                                                                value={this.state.driver_donations}
                                                                                onChange={this.handle_driver_donations}
                                                                                className="input-field"
                                                                            >
                                                                                <option value="0.1">10%</option>
                                                                                <option value="0.15">15%</option>
                                                                                <option value="0.2">20%</option>
                                                                                <option value="0.25">25%</option>
                                                                                <option value="0.3">30%</option>
                                                                            </Input>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Label md={4} sm={4}>
                                                                            Seats
                                                                        </Label>
                                                                        <Col className="form-col" md={{size:6, offset:2}} sm={{size:6, offset:2}}>
                                                                            <Input
                                                                                type="select"
                                                                                value={this.state.driver_seats}
                                                                                onChange={this.handle_driver_seats}
                                                                                className="input-field"
                                                                            >
                                                                                <option value="1">1</option>
                                                                                <option value="2">2</option>
                                                                            </Input>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </FormGroup>

                                                            <FormGroup row className="row-estimate">
                                                                <Col md={{size:6, offset:6}}>
                                                                    <Row className="form-group">
                                                                        <Label sm={6}>
                                                                            CO2 Savings
                                                                        </Label>
                                                                        <Col className="form-col" sm={6}>
                                                                            <Input
                                                                                readOnly
                                                                                tabIndex="-1"
                                                                                placeholder="200lbs"
                                                                                type="text"
                                                                                value={str_format("{} lbs", this.state.driver_co2_savings)}
                                                                            ></Input>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Label sm={6}>
                                                                            Estimated Earnings
                                                                            <span id="tooltip116884156"><i className="now-ui-icons travel_info"></i></span>
                                                                        </Label>
                                                                        <UncontrolledPopover
                                                                            trigger="hover"
                                                                            placement="top"
                                                                            target="tooltip116884156"
                                                                        >
                                                                            <PopoverHeader>Estimated Earnings</PopoverHeader>
                                                                            <PopoverBody>
                                                                            These earnings are estimated based on trip miles for each seat. Passenger will initiate a bid price for the seat which you will receive on the app. Driver can accept or counter the offer on the app only. ALL OFFERS CAN ONLY OCCUR ON THE APP
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                        <Col sm={6}>
                                                                            <Input
                                                                                readOnly
                                                                                tabIndex="-1"
                                                                                placeholder="$35.00~$55.00"
                                                                                type="text"
                                                                                value={str_format("${} ~ ${}", this.state.driver_earning_low, this.state.driver_earning_high)}
                                                                            ></Input>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </FormGroup>

                                                            <h5>Personal Information</h5>
                                                            <FormGroup row>
                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>First name</Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <Input
                                                                                name="driver_first_name"
                                                                                type="text"
                                                                                placeholder="First name"
                                                                                value={this.state.driver_first_name}
                                                                                onChange={this.handle_driver_input} 
                                                                                className="input-field"/>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>Last name</Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <Input
                                                                                name="driver_last_name"
                                                                                type="text"
                                                                                placeholder="Last name"
                                                                                value={this.state.driver_last_name}
                                                                                onChange={this.handle_driver_input}
                                                                                className="input-field" />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>Email</Label>
                                                                        <Col className={"form-col " + this.state.driver_email_valid} md={8} sm={8}>
                                                                            <Input
                                                                                name="driver_email"
                                                                                type="email"
                                                                                placeholder="College Email Only"
                                                                                value={this.state.driver_email}
                                                                                onChange={this.handle_driver_input}
                                                                                className="input-field" />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>Travel Date</Label>
                                                                        <Col md={8} sm={8}>
                                                                            <Datetime
                                                                                onChange={this.handle_driver_date}
                                                                                timeFormat={false}
                                                                                inputProps={{ placeholder: "MM/DD/YYYY" }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </FormGroup>

                                                            <FormGroup check row>
                                                                <Col sm={{ size: 8, offset: 2 }}>
                                                                    <Button type="button" color="primary" size="lg" onClick={this.handle_driver_submit}>Submit</Button>
                                                                </Col>
                                                            </FormGroup>
                                                        </Form>
                                                    </TabPane>

                                                    <TabPane tabId="iconPills2">
                                                        <Form>
                                                            <h5>Trip Details</h5>
                                                            <FormGroup row>
                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label  md={4} sm={4}>
                                                                            Origin City
                                                                        </Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <GooglePlacesAutocomplete
                                                                                onSelect={this.set_rider_src_raw}
                                                                                placeholder="Chicago"
                                                                                initialValue={this.state.rider_src_description}
                                                                                renderInput={(props) => (
                                                                                    <div className="custom-wrapper" onClick={this.handle_rider_src}>
                                                                                        <Input 
                                                                                            // Custom properties
                                                                                            {...props}
                                                                                            className="input-field"
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>
                                                                            Destination College
                                                                        </Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <GooglePlacesAutocomplete
                                                                                onSelect={this.set_rider_dst_raw}
                                                                                placeholder="Lewis University-Romeoville"
                                                                                initialValue={this.state.rider_dst_description}
                                                                                renderInput={(props) => (
                                                                                    <div className="custom-wrapper" onClick={this.handle_rider_dst}>
                                                                                        <Input 
                                                                                            // Custom properties
                                                                                            {...props}
                                                                                            className="input-field"
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                                
                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>
                                                                            Donation<span id="tooltip116884157">
                                                                            <i className="now-ui-icons travel_info"></i></span>
                                                                        </Label>
                                                                        <UncontrolledPopover
                                                                            trigger="hover"
                                                                            placement="top"
                                                                            target="tooltip116884157"
                                                                        >
                                                                            <PopoverHeader>Rider Donation</PopoverHeader>
                                                                            <PopoverBody>
                                                                            Donations are added to the final agreed* trip price . So if you and driver agree to pay a student driver $25 for seat trip and you donate $5, the total amount charged to credit card will be $30 plus a minimum service fee. Wyth is different than rideshare companies, passengers make offers for the seat to the driver and the driver can either accept the offer or counter the offer. ALL OFFERS CAN ONLY OCCUR ON THE APP
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                        <Col className="form-col" md={{size:6, offset:2}} sm={{size:6, offset:2}}>
                                                                            <Input
                                                                                type="select"
                                                                                value={this.state.rider_donations}
                                                                                onChange={this.handle_rider_donations}
                                                                                className="input-field"
                                                                            >
                                                                                <option value="5">$5</option>
                                                                                <option value="10">$10</option>
                                                                            </Input>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </FormGroup>

                                                            <FormGroup row className="row-estimate">
                                                                <Col md={{size:6, offset:6}}>
                                                                    <Row className="form-group">
                                                                        <Label sm={6}>
                                                                            CO2 Savings
                                                                        </Label>
                                                                        <Col className="form-col" sm={6}>
                                                                            <Input
                                                                                readOnly
                                                                                tabIndex="-1"
                                                                                placeholder="200lbs"
                                                                                type="text"
                                                                                value={str_format("{} lbs", this.state.rider_co2_savings)}
                                                                            ></Input>
                                                                        </Col>
                                                                    </Row>
                                                                    <Row>
                                                                        <Label sm={6}>
                                                                            Estimated Offer
                                                                            <span id="tooltip116884158"><i className="now-ui-icons travel_info"></i></span>
                                                                        </Label>
                                                                        <UncontrolledPopover
                                                                            trigger="hover"
                                                                            placement="top"
                                                                            target="tooltip116884158"
                                                                        >
                                                                            <PopoverHeader>Estimated Offer</PopoverHeader>
                                                                            <PopoverBody>
                                                                            Passenger will initiate a bid price offer for the seat based on suggested algorithm. Driver will then either accept your offer or counter it on the app only. Final price is set when driver accepts your final offer.
                                                                            </PopoverBody>
                                                                        </UncontrolledPopover>
                                                                        <Col sm={6}>
                                                                            <Input
                                                                                readOnly
                                                                                tabIndex="-1"
                                                                                placeholder="$35.00~$55.00"
                                                                                type="text"
                                                                                value={str_format("${} ~ ${}", this.state.rider_offer_low, this.state.rider_offer_high)}
                                                                            ></Input>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </FormGroup>

                                                            <h5>Personal Information</h5>
                                                            <FormGroup row>
                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>First name</Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <Input
                                                                                name="rider_first_name"
                                                                                type="text"
                                                                                placeholder="First name"
                                                                                value={this.state.rider_first_name}
                                                                                onChange={this.handle_rider_input}
                                                                                className="input-field" />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>Last name</Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <Input
                                                                                name="rider_last_name"
                                                                                type="text"
                                                                                placeholder="Last name"
                                                                                value={this.state.rider_last_name}
                                                                                onChange={this.handle_rider_input}
                                                                                className="input-field" />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>

                                                                <Col md={6}>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>Email</Label>
                                                                        <Col className={"form-col " + this.state.rider_email_valid} md={8} sm={8}>
                                                                            <Input
                                                                                name="rider_email"
                                                                                type="email"
                                                                                placeholder="College Email Only"
                                                                                value={this.state.rider_email}
                                                                                onChange={this.handle_rider_input}
                                                                                className="input-field" />
                                                                        </Col>
                                                                    </Row>
                                                                    <Row className="form-group">
                                                                        <Label md={4} sm={4}>Travel Date</Label>
                                                                        <Col className="form-col" md={8} sm={8}>
                                                                            <Datetime
                                                                                onChange={this.handle_rider_date}
                                                                                timeFormat={false}
                                                                                inputProps={{ placeholder: "MM/DD/YYYY" }}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </FormGroup>

                                                            <FormGroup check row>
                                                                <Col sm={{ size: 8, offset: 2 }}>
                                                                <Button type="button" color="primary" size="lg" onClick={this.handle_rider_submit}>Submit</Button>
                                                                </Col>
                                                            </FormGroup>
                                                        </Form>
                                                    </TabPane>
                                                </TabContent>

                                                

                                                <Alert color="danger" isOpen={this.state.alert}>
                                                    <Container>
                                                        <div className="alert-icon">
                                                        <i className="now-ui-icons objects_support-17"></i>
                                                        </div>
                                                        {this.state.alert_text}
                                                        <button
                                                        type="button"
                                                        className="close"
                                                        onClick={() => this.setState({alert: false}) }
                                                        >
                                                        <span aria-hidden="true">
                                                            <i className="now-ui-icons ui-1_simple-remove"></i>
                                                        </span>
                                                        </button>
                                                    </Container>
                                                </Alert>

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
                                                    <p>Ride is created successfully!</p>
                                                    <div>
                                                        <p>CO2 Saved: {this.state.driver_text1}</p>
                                                        <p>Donation: {this.state.driver_text2}</p>
                                                        <p>Estimated Earnings: {this.state.driver_text3}</p>
                                                    </div>
                                                    <div className="download-app">
                                                        <p>Offers can only be accepted on App, so <a href="https://apps.apple.com/us/app/wyth/id1428331609" target="_blank" rel="noopener noreferrer">download app</a> now.</p>
                                                    </div>
                                                    </ModalBody>
                                                    <div className="modal-footer">
                                                    <Button
                                                        className="btn-neutral"
                                                        color="link"
                                                        type="button"
                                                        onClick={() => {this.setState({modal1: false}); this.props.history.push("/tutorial");} }
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
                                                    <p>Ride request failed!</p>
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

                                                <Modal
                                                    modalClassName="modal-mini modal-info"
                                                    toggle={() => this.setState({modal3: false}) }
                                                    isOpen={this.state.modal3}
                                                >
                                                    <div className="modal-header justify-content-center">
                                                    <div className="modal-profile">
                                                        <i className="now-ui-icons ui-1_check"></i>
                                                    </div>
                                                    </div>
                                                    <ModalBody>
                                                    <p>Ride request is created successfully!</p>
                                                    <div>
                                                        <p>CO2 Saved: {this.state.rider_text1}</p>
                                                        <p>Donation: {this.state.rider_text2}</p>
                                                        <p>Offer: {this.state.rider_text3}</p>
                                                    </div>
                                                    <div className="download-app">
                                                        <p>Offers can only be made on App, so <a href="https://apps.apple.com/us/app/wyth/id1428331609" target="_blank" rel="noopener noreferrer">download app</a> now.</p>
                                                    </div>
                                                    </ModalBody>
                                                    <div className="modal-footer">
                                                    <Button
                                                        className="btn-neutral"
                                                        color="link"
                                                        type="button"
                                                        onClick={() => {this.setState({modal3: false}); this.props.history.push("/tutorial");} }
                                                    >
                                                        Close
                                                    </Button>
                                                    </div>
                                                </Modal>

                                                <Modal
                                                    modalClassName="modal-mini modal-danger"
                                                    toggle={() => this.setState({modal4: false}) }
                                                    isOpen={this.state.modal4}
                                                >
                                                    <div className="modal-header justify-content-center">
                                                    <div className="modal-profile">
                                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                                    </div>
                                                    </div>
                                                    <ModalBody>
                                                    <p>Ride request failed!</p>
                                                    </ModalBody>
                                                    <div className="modal-footer">
                                                    <Button
                                                        className="btn-neutral"
                                                        color="link"
                                                        type="button"
                                                        onClick={() => this.setState({modal4: false}) }
                                                    >
                                                        Close
                                                    </Button>
                                                    </div>
                                                </Modal>
                                                
                                            </Col>
                                        </Row>
                                    </Container>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(BTSC);