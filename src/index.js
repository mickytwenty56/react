/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";

// pages for this kit
import Index from "views/Index.js";
import AboutIndex from "views/about/index.js";
import StepsIndex from "views/steps/index.js";

import CategoryIndex from "views/category/index.js";
import FaqIndex from "views/faq/index.js"
import TutorialIndex from "views/tutorial/index.js";

import BTSCIndex from "views/btsc/index.js"

import ContactIndex from "views/contact/index.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Switch>
        <Route path="/index" render={props => <Index {...props} />} />

        (/** Company */)
        <Route path="/about" render={props => <AboutIndex {...props} />} />
        <Route path="/steps" render={props => <StepsIndex {...props} />} />

        (/** Help */)
        <Route path="/category/driver" render={props => <CategoryIndex category="driver" {...props} />} />
        <Route path="/faqs" render={props => <FaqIndex {...props} />} />
        <Route path="/tutorial" render={props => <TutorialIndex {...props} />} />

        (/** BTSC */)
        <Route path="/btsc" render={props => <BTSCIndex {...props} />} />

        (/** Contact */)
        <Route path="/contact" render={props => <ContactIndex {...props} />} />

        <Redirect to="/index" />
        <Redirect from="/" to="/index" />
      </Switch>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
