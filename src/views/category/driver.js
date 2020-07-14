import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

class DriverCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="section section-driver">
                    <Container>
                        <h2>Driver Tips</h2>
                        <Row className="section-post">
                            <Col md={4} sm={5}>
                                <img src={require("assets/img/post_gas_saving.jpg")} alt="post_gas_saving" />
                            </Col>
                            <Col md={8} sm={7}>
                                <h3>Save gas, save energy</h3>
                                <p>
                                    <strong>Gas-Saving Tips for Your Auto</strong><br/>
                                    While it is always wise to conserve natural resources, the recent price of gasoline has made even the most wasteful people think twice. Whatever your motivation, here are some gas saving tips from the pros at the National Institute for Automotive Service Excellence (ASE).
                                </p>
                                <p>
                                    <strong>Monitor tires.</strong> Under inflated tires or poorly aligned wheels waste fuel by forcing the engine to work harder. (Let the tires cool down before checking the air pressure.) Out-of-line wheels, as evidenced by uneven tread wear, should be aligned by a professional.
                                </p>
                                <p>
                                    <strong>Remove excess weight.</strong> Remove unnecessary items from the vehicle. Store only essentials in the trunk. Less weight means better mileage.
                                </p>
                                <p>
                                    <strong>Consolidate trips and errands.</strong> Some trips may be unnecessary. Also, try to travel when traffic is light so you can avoid stop-and-go conditions.
                                </p>
                                <p>
                                    <strong>Avoid excessive idling.</strong> Shut off the engine while waiting for friends and family.
                                </p>
                                <p>
                                    <strong>Observe speed limits.</strong> Speeding decreases your miles per gallon.
                                </p>
                                <p>
                                    <strong>Drive gently.</strong> Sudden accelerations guzzle gas. Anticipate traffic patterns ahead and adjust your speed gradually.
                                </p>
                                <p>
                                    Use windows and air conditioning wisely. Your mileage should improve if you keep the windows closed at highway speeds, since air drag is reduced. This is true even with the air conditioning on-assuming that the system is in good working order. But turn the air conditioning off in stop-and-go traffic to save fuel.
                                </p>
                                <p>
                                    Keep your engine “tuned up.” A well-maintained engine operates at peak efficiency, maximizing gas mileage. Follow the service schedules listed in the owner’s manual. Replace filters and fluids as recommended; have engine performance problems (rough idling, poor acceleration, etc.) corrected at a repair facility. Given today’s high-tech engines, it’s wise to have this type of work done by auto technicians who are ASE certified in engine performance.
                                </p>
                                <p>
                                    These conservation tips will not only save gasoline, they’ll help extend the life of your vehicle. Win-win, indeed.
                                </p>
                            </Col>
                        </Row>

                        <Row className="section-post">
                            <Col md={4} sm={5}>
                                <img src={require("assets/img/post_feat_rested.jpg")} alt="post_feat_rested" />
                            </Col>
                            <Col md={8} sm={7}>
                                <h3>Stay rested, stay safe</h3>
                                <p>
                                    Staying alert and rested while traveling in a vehicle or on a bike is the most important part of making your trip a safe and relaxed one. Distractions like cell phones or radios, as well as being overly tired, create hazardous conditions that impede your ability to respond to changing conditions. In fact, cultivating your own awareness is one of the most important things you can do to create safer conditions while traveling.
                                </p>
                                <p>
                                    <strong>Practice Mindful Traveling</strong><br/>
                                    When you are driving a car or riding your bike, turn off any distractions and let your attention rest on the sensations, sights, and sounds around you. Research shows that true “multi-tasking” isn’t really possible—when we try to do multiple things at once, we deplete our focus and ability to make good decisions.
                                </p>
                                
                            </Col>
                        </Row>

                        <Row className="section-post">
                            <Col md={4} sm={5}>
                                <img src={require("assets/img/post_feat_roadside.jpg")} alt="post_feat_roadside" />
                            </Col>
                            <Col md={8} sm={7}>
                                <h3>Roadside safery tips</h3>
                                <p>
                                    How you fare when your vehicle fails is often a matter of how you respond. The decisions you make are important and can have positive or negative consequences. Fortunately, most problems are preventable.
                                </p>
                                <p>
                                    <strong>Prevention and preparedness are key:</strong><br/>
                                </p>
                                
                                <ul>
                                    <li>Get in the habit of conducting periodic safety checks to make sure your vehicle is in good operating condition.</li>
                                    <li>A safety check includes tires, lights, belts, hoses, fluids and windshield wipers.</li>
                                    <li>Read your owner’s manual to clearly understand which dash lights or signals indicate your vehicle is not operating properly and what to do in such situations.</li>
                                    <li>Before a road trip, contact AAA to arrange for a free test of your vehicle’s battery, starting and charging system. This can help determine how much life is left in your battery and if any other components need repairs.</li>
                                    <li>Program your cell phone with emergency numbers, including that of your roadside assistance provider, and keep a backup written list in your glove compartment.</li>
                                    <li>Always carry a well-stocked emergency kit and familiarize yourself with the use of safety flares, warning triangles and other emergency equipment.</li>
                                </ul>
                                
                                
                            </Col>
                        </Row>
                    </Container>
                </div>
            </>
        );
    }
}

export default DriverCategory;