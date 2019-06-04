import React from 'react';
import Catalog from './Catalog';
import { BrowserRouter, Route } from "react-router-dom";
import Tour from './Tour';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Route exact path={"/"} component={Catalog} />
                <Route exact path={"/:tourId"} render={({ match }) => <Tour match={match} />} />
            </BrowserRouter>
        );
    }
}

export default App;
