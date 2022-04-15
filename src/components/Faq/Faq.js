import React from 'react';
import Header from '../../containers/Header';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ProductListing from '../../containers/ProductListing';
import ProductDetail from '../../containers/ProductDetail';

export default function Faq() {
    return (
        <>
            {/* Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ut amet, labore blanditiis aliquam ipsa consequuntur accusamus modi veniam deserunt doloremque rem impedit, odit iste dolorum magnam ducimus quisquam incidunt?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ut amet, labore blanditiis aliquam ipsa consequuntur accusamus modi veniam deserunt doloremque rem impedit, odit iste dolorum magnam ducimus quisquam incidunt?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere ut amet, labore blanditiis aliquam ipsa consequuntur accusamus modi veniam deserunt doloremque rem impedit, odit iste dolorum magnam ducimus quisquam incidunt? */}
            <br/><br/>
            <Router>
                <Header/>
                <Switch>
                    <Route path="/faq" exact component={ProductListing} />
                    <Route path="/product/:productId" exact component={ProductDetail} />
                    <Route> 404 not found!!!! </Route>
                </Switch>
            </Router>
        </>
    )
}