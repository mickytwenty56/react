import React, { Component } from "react";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import IndexFooter from "components/Footers/IndexFooter.js";

// sections for this page
import IndexBts from "./index/indexbts.js";
import Heros from "./index/heros.js";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    this.handle_sidebar();
  }

  componentDidUpdate() {
      this.handle_sidebar();
  }

  handle_sidebar = () => {
      document.body.classList.add("index-page");
      document.body.classList.add("sidebar-collapse");
      document.documentElement.classList.remove("nav-open");
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      return function cleanup() {
          document.body.classList.remove("index-page");
          document.body.classList.remove("sidebar-collapse");
      };
  }

  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <IndexHeader />
          <div className="main">
            <IndexBts />
            <Heros />
          </div>
          <IndexFooter />
        </div>
      </>
    );
  }
}

export default Index;
