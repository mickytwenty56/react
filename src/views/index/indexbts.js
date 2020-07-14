import React, { Component } from "react";
import { withRouter} from 'react-router-dom';
import axios from "./../../components/btsc_axios.js"

import { 
    Container, 
    Row, 
    Card, 
    Col, 
    CardHeader, 
    CardTitle, 
    CardBody, 
    NavItem,
    NavLink,
    Nav,
    TabContent,
    TabPane,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    UncontrolledCollapse,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody,
} from "reactstrap";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "react-google-places-autocomplete/dist/index.min.css";

import DonationProgressBar from "components/ProgressBar/donation_commit";
import Co2SavingsProgressBar from "components/ProgressBar/co2_savings";

import str_format from "string-format";

import "./style.css";

let driver_src_place_id = "", driver_dst_place_id = "";
let rider_src_place_id = "", rider_dst_place_id = "";
let driver_src_raw = "", driver_dst_raw = "";
let rider_src_raw = "", rider_dst_raw = "";

class IndexBts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconPills: "1",

            driver_donations: 0.1,
            driver_seats: 1,
            driver_earning_low: 0,
            driver_earning_high: 0,
            driver_co2_savings: 0,

            rider_donations: 5,
            rider_offer_low: 0,
            rider_offer_high: 0,
            rider_co2_savings: 0
        }

    }

    /** Driver */
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
            },
        })
        .then(
            (res) => {
                console.log(res.data);
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

    handle_driver_next = () => {
        if ( driver_src_place_id === "" || driver_dst_place_id === "" )
            return;
        
        localStorage.setItem("from_home", "driver");

        localStorage.setItem("params", JSON.stringify({
            src_place_id: driver_src_place_id,
            dst_place_id: driver_dst_place_id,
            seats: this.state.driver_seats,
            donation: this.state.driver_donations,
            earning_low: this.state.driver_earning_low,
            earning_high: this.state.driver_earning_high,
            co2_savings: this.state.driver_co2_savings,
        }));

        localStorage.setItem("data", JSON.stringify({
            src_raw: driver_src_raw,
            dst_raw: driver_dst_raw,
        }));

        this.props.history.push("/btsc"); 
    }

    /** Rider */
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
            },
        })
        .then(
            (res) => {
                console.log(res.data);
                const data = res.data;
                this.setState({rider_co2_savings: data.co2_savings});
                this.setState({rider_offer_low: data.rider_offer.low});
                this.setState({rider_offer_high: data.rider_offer.high});
            })
        .catch(
            (error) => {
                console.log(error);
                this.setState({rider_co2_savings: 0});
                this.setState({rider_offer_low: 0});
                this.setState({rider_offer_high: 0});
            }
        );
    };

    handle_rider_next = () => {
        if ( rider_src_place_id === "" || rider_dst_place_id === "" )
            return;
        
        localStorage.setItem("from_home", "rider");

        localStorage.setItem("params", JSON.stringify({
            src_place_id: rider_src_place_id,
            dst_place_id: rider_dst_place_id,
            donation: this.state.rider_donations,
            offer_low: this.state.rider_offer_low,
            offer_high: this.state.rider_offer_high,
            co2_savings: this.state.rider_co2_savings,
        }));

        localStorage.setItem("data", JSON.stringify({
            src_raw: rider_src_raw,
            dst_raw: rider_dst_raw,
        }));

        this.props.history.push("/btsc"); 
    }

    render() {
        return (
            <div
                className="section section-bts"
                style={{
                backgroundImage: "url(" + require("assets/img/bg11.jpg") + ")"
                }}
            >
                <Container>
                    <Row className="progress-row">
                        <Col lg={8} md={6} className="text-block">
                            <p>Back-to-School Challenge is a student-led effort to raise $1 million for a National Day of Thanks to Healthcare Workers. Together we can reach our goal. Share this BTS Challenge!</p>
                        </Col>
                        <Col lg={4} md={6} className="progress-block">
                            <DonationProgressBar />
                        </Col>
                    </Row>
                    <Row className="progress-row">
                        <Col lg={4} md={6} className="progress-block">
                            <Co2SavingsProgressBar />
                        </Col>
                        <Col lg={8} md={6} className="text-block text-block1">
                            <p>Back-to-School Challenge is for students to save the environment 10 million lbs of CO2 on this single event, going back to school this fall.
                            <a color="primary" id="toggler" style={{ marginBottom: '1rem' }}>
                            Read more
                            </a>
                            </p>
                            <UncontrolledCollapse toggler="#toggler">
                                <ul>
                                    <li>1 carpool mile traveled saves 1 pound CO2.</li>
                                    <li>Average trip home to school is 135 miles (Pell Grant)<br/> Round trip of 270 miles produces 270 lbs of CO2.</li>
                                    <li>It takes 10 trees 1 year to clean up 270 lbs of CO2.</li>
                                    <li>74,000 carpool trips = 10 million lbs of CO2 saved.</li>
                                    <li>Two passengers means we get to the goal 50% faster.</li>
                                </ul>
                                <p>It’s Our World, Our Mission!</p>
                            </UncontrolledCollapse>
                        </Col>
                    </Row>
                    <Row>
                        <Card className="card-bts" data-background-color="green">
                            
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

                                <CardTitle className="title-up" tag="h3">
                                    {this.state.iconPills === "1" ? "See your trip earning estimates" : "See your trip cost estimates"}
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Container className="description">
                                    <Row>
                                        <Col md={6} className="text-block1">
                                            <h5>Students Beat Back COVID 19 With 2 GOALS</h5>
                                            <ul>
                                                <li>Students Donate $1 Million to Healthcare Workers</li>
                                                <li>Students Save 10 Million lbs of CO2 on back to school trips</li>
                                            </ul>
                                            <p>
                                            Whenever your school reopens (and they will reopen) & as you go back to school, join this exciting effort and make a difference.
                                            </p>
                                            <h5>Students United Against COVID 19</h5>
                                            <ul>
                                                <li>Your donation/participation will crush it!!</li>
                                            </ul>
                                        </Col>
                                        <Col md={6}>
                                            
                                            <TabContent
                                                className="text-center"
                                                activeTab={"iconPills" + this.state.iconPills}
                                            >
                                                <TabPane tabId="iconPills1">
                                                    <Form>
                                                        <FormGroup row>
                                                            <Label sm={4}>
                                                                Origin City
                                                            </Label>
                                                            <Col sm={8}>
                                                                <GooglePlacesAutocomplete
                                                                    onSelect={this.set_driver_src_raw}
                                                                    placeholder="Chicago"
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={4}>
                                                                Destination College
                                                            </Label>
                                                            <Col sm={8}>
                                                                <GooglePlacesAutocomplete
                                                                    onSelect={this.set_driver_dst_raw}
                                                                    placeholder="Lewis University-Romeoville"
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={4}>
                                                                Donation
                                                                <span id="tooltip146884155"><i className="now-ui-icons travel_info"></i></span>
                                                            </Label>
                                                            <UncontrolledPopover
                                                                trigger="hover"
                                                                placement="top"
                                                                target="tooltip146884155"
                                                            >
                                                                <PopoverHeader>Driver Donation</PopoverHeader>
                                                                <PopoverBody>
                                                                Donations are calculated from gross income. 75% from driver and 25% from Wyth’s income. So a total trip gross revenue of $100, and you “donate” 20% which is $20, you are donating $15 from your share and $5 from Wyth’s share. Rest of revenue of $80 is split at 75% to driver & 25% to Wyth
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                            <Col sm={{size:6, offset:2}}>
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={4}>
                                                                Seats
                                                            </Label>
                                                            <Col sm={{size:6, offset:2}}>
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={6}>
                                                                Estimated Earnings
                                                                <span id="tooltip116584156"><i className="now-ui-icons travel_info"></i></span>
                                                            </Label>
                                                            <UncontrolledPopover
                                                                trigger="hover"
                                                                placement="top"
                                                                target="tooltip116584156"
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={6}>
                                                                CO2 Savings
                                                            </Label>
                                                            <Col sm={6}>
                                                                <Input
                                                                    readOnly
                                                                    tabIndex="-1"
                                                                    placeholder="200lbs"
                                                                    type="text"
                                                                    value={str_format("{} lbs", this.state.driver_co2_savings)}
                                                                ></Input>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup check row>
                                                            <Col className="text-right" sm={12}>
                                                                <Button type="button" color="primary" size="lg" onClick={this.handle_driver_next}>Next</Button>
                                                            </Col>
                                                        </FormGroup>
                                                    </Form>
                                                </TabPane>

                                                <TabPane tabId="iconPills2">
                                                    <Form>
                                                        <FormGroup row>
                                                            <Label sm={4}>
                                                                Origin City
                                                            </Label>
                                                            <Col sm={8}>
                                                                <GooglePlacesAutocomplete
                                                                    onSelect={this.set_rider_src_raw}
                                                                    placeholder="Chicago"
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={4}>
                                                                Destination College
                                                            </Label>
                                                            <Col sm={8}>
                                                                <GooglePlacesAutocomplete
                                                                    onSelect={this.set_rider_dst_raw}
                                                                    placeholder="Lewis University-Romeoville"
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={4}>
                                                                Donation
                                                                <span id="tooltip146884157"><i className="now-ui-icons travel_info"></i></span>
                                                            </Label>
                                                            <UncontrolledPopover
                                                                trigger="hover"
                                                                placement="top"
                                                                target="tooltip146884157"
                                                            >
                                                                <PopoverHeader>Rider Donation</PopoverHeader>
                                                                <PopoverBody>
                                                                Donations are added to the final agreed* trip price . So if you and driver agree to pay a student driver $25 for seat trip and you donate $5, the total amount charged to credit card will be $30 plus a minimum service fee. Wyth is different than rideshare companies, passengers make offers for the seat to the driver and the driver can either accept the offer or counter the offer. ALL OFFERS CAN ONLY OCCUR ON THE APP
                                                                </PopoverBody>
                                                            </UncontrolledPopover>
                                                            <Col sm={{size:6, offset:2}}>
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={6}>
                                                                Estimated Offer
                                                                <span id="tooltip116284158"><i className="now-ui-icons travel_info"></i></span>
                                                            </Label>
                                                            <UncontrolledPopover
                                                                trigger="hover"
                                                                placement="top"
                                                                target="tooltip116284158"
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
                                                        </FormGroup>
                                                        <FormGroup row>
                                                            <Label sm={6}>
                                                                CO2 Savings
                                                            </Label>
                                                            <Col sm={6}>
                                                                <Input
                                                                    readOnly
                                                                    tabIndex="-1"
                                                                    placeholder="200lbs"
                                                                    type="text"
                                                                    value={str_format("{} lbs", this.state.rider_co2_savings)}
                                                                ></Input>
                                                            </Col>
                                                        </FormGroup>
                                                        <FormGroup check row>
                                                            <Col className="text-right" sm={12}>
                                                            <Button type="button" color="primary" size="lg" onClick={this.handle_rider_next}>Next</Button>
                                                            </Col>
                                                        </FormGroup>
                                                    </Form>
                                                </TabPane>
                                            </TabContent>
                                            
                                        </Col>

                                        <Col md={6} className="text-block2">
                                            <h5>Students Beat Back COVID 19 With 2 GOALS</h5>
                                            <ul>
                                                <li>Students Donate $1 Million to Healthcare Workers</li>
                                                <li>Students Save 10 Million lbs of CO2 on back to school trips</li>
                                            </ul>
                                            <p>
                                            Whenever your school reopens (and they will reopen) & as you go back to school, join this exciting effort and make a difference.
                                            </p>
                                            <h5>Students United Against COVID 19</h5>
                                            <ul>
                                                <li>Your donation/participation will crush it!!</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </Container>
                            </CardBody>
                        </Card>
                    </Row>
                </Container>
          </div>
        )
    };
}

export default withRouter(IndexBts);