import React, { Component } from "react";
import axios from "./../btsc_axios";

import { 
    CircularProgressbarWithChildren,
    buildStyles 
} from 'react-circular-progressbar';
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import "react-circular-progressbar/dist/styles.css";

import "./style.css";

const totals = 1000000;

class DonationProgressBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            donations_percent: 0,
            donations_value: 0
        }
    }

    formatNumber(value) {
        const val = (value / 1);
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    componentDidMount() {
        this.handle_progress();
    }

    componentWillReceiveProps = (props) => {
        const { refresh } = this.props;
        if ( props.refresh !== refresh ) {
            this.handle_progress();
        }
    }

    handle_progress = () => {
        axios({
            method: "get",
            url: "/totals"
        })
        .then(
            (res) => {
                this.setState({donations_value: res.data.total_donations});
                this.setState({donations_percent: res.data.total_donations / totals * 100})
            })
        .catch(
            (error) => {
                this.setState({donations_value: 0});
                this.setState({donations_percent: 0})
            });
    }

    render() {
        return (
            <>
                <div className="donation_progress">
                    <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={this.state.donations_percent}
                        duration={1.4}
                        easingFunction={easeQuadInOut}
                    >
                        {value => {
                            const roundedValue = Math.round(value);
                            return (
                                <CircularProgressbarWithChildren
                                value={value}
                                text={`${roundedValue}%`}
                                strokeWidth={6}
                                /* This is important to include, because if you're fully managing the
                                animation yourself, you'll want to disable the CSS animation. */
                                styles={buildStyles({ pathTransition: "none" })}
                                >
                                    <div style={{ fontSize: 14, marginTop: 100 }}>
                                        <strong>${this.formatNumber(this.state.donations_value)}</strong>
                                    </div>
                                </CircularProgressbarWithChildren>
                            );
                        }}
                    </AnimatedProgressProvider>
                    <div>
                        <p>Target: ${this.formatNumber(totals)}</p>
                    </div>
                </div>
            </>
        );
    }
}

export default DonationProgressBar;