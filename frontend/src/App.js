import { Redirect, Route, Switch } from 'react-router-dom';

import LandingScreen from './components/LandingScreen';
import AuthScreen from './components/AuthScreen';

const App = () => {
    return (
        <Switch>
            <Route path="/main" component={LandingScreen} />
            <Route path="/auth" component={AuthScreen} />
            <Redirect to="/main/homePage" />
        </Switch>
    );
};

export default App;