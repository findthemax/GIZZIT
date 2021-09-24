import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./components/homepage/Homepage";
import OrderSuccess from "./components/homepage/OrderSuccess"
import TermsAndConditions from "./components/homepage/TermsAndConditions";


//Google Analytics
import ReactGA from 'react-ga';

//Redux
import { Provider } from 'react-redux'
import store from './store'

//Styles
import 'normalize.css/normalize.css'
import './App.scss';

ReactGA.initialize('XXXXXX', {
    siteSpeedSampleRate: 100
});
ReactGA.pageview(window.location.pathname + window.location.search);


const App = ()  => {

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Header/>
                    <Route exact path="/" component={Homepage} />
                    <Switch>
                        <Route exact path="/order_success" component={OrderSuccess} />
                        <Route exact path="/terms_conditions" component={TermsAndConditions} />
                    </Switch>
                    <Footer/>
                </Fragment>
            </Router>
        </Provider>
    )
}


export default App;
