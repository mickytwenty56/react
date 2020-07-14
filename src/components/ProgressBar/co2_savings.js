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

const totals = 10000000;

class Co2SavingsProgressBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            co2_percent: 0,
            co2_value: 0
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
                this.setState({co2_value: res.data.total_co2_emissions});
                this.setState({co2_percent: res.data.total_co2_emissions / totals * 100})
            })
        .catch(
            (error) => {
                this.setState({co2_value: 0});
                this.setState({co2_percent: 0})
            });
    }

    render() {
        return (
            <>
                <div className="co2_progress">
                    <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={this.state.co2_percent}
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
                                styles={buildStyles({ pathTransition: "none", textColor: "green", pathColor: "green" })}
                                >
                                    <div style={{ fontSize: 14, marginTop: 100 }}>
                                        <strong>{this.formatNumber(this.state.co2_value)} LBS</strong>
                                    </div>
                                </CircularProgressbarWithChildren>
                            );
                        }}
                    </AnimatedProgressProvider>
                    <div>
                        <p>Target: {this.formatNumber(totals)} LBS</p>
                    </div>
                </div>
            </>
        );
    }
}

export default Co2SavingsProgressBar;